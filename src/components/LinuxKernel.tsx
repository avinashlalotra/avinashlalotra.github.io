import React, { useEffect, useState } from "react";
import Papa from "papaparse";

interface Patch {
  status: string;
  title: string;
  link: string;
  commit?: string;
  commit_link?: string;
}

const statusColors: Record<string, string> = {
  accepted: "bg-green-100 text-green-700",
  "signed-off-by": "bg-green-100 text-green-700",
  "reviewed-by": "bg-green-100 text-green-700",
  "acked-by": "bg-green-100 text-green-700",
  "reported-by": "bg-green-100 text-green-700",
  ongoing: "bg-yellow-100 text-yellow-800",
  dropped: "bg-red-100 text-red-700",
  "not accepted": "bg-gray-100 text-gray-700",
  "": "bg-gray-100 text-gray-700",
};

export default function LinuxKernel() {
  const [patches, setPatches] = useState<Patch[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadCSV = async (path: string) => {
      const res = await fetch(path);
      const text = await res.text();
      return new Promise<Patch[]>((resolve) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => resolve(result.data as Patch[]),
        });
      });
    };

    Promise.all([loadCSV("/linuxa.csv"), loadCSV("/linuxn.csv")]).then(
      ([accepted, notAccepted]) => {
        const merged = [
          ...accepted.map((p) => ({
            ...p,
            status: normalizeStatus(p.status),
          })),
          ...notAccepted.map((p) => ({
            ...p,
            status: normalizeStatus(p.status || "not accepted"),
          })),
        ];
        setPatches(merged);
      }
    );
  }, []);

  const isAcceptedFamily = (status: string) =>
    ["accepted", "reviewed-by", "signed-off-by", "acked-by", "reported-by"].includes(
      status.toLowerCase()
    );

  const filtered =
    filter === "all"
      ? patches
      : filter === "accepted"
      ? patches.filter((p) => isAcceptedFamily(p.status))
      : filter === "ongoing"
      ? patches.filter((p) => p.status.toLowerCase() === "ongoing")
      : patches.filter(
          (p) => !isAcceptedFamily(p.status) && p.status !== "ongoing"
        );

  const countAccepted = patches.filter((p) => isAcceptedFamily(p.status)).length;
  const countOngoing = patches.filter(
    (p) => p.status.toLowerCase() === "ongoing"
  ).length;
  const countNotAccepted =
    patches.length - countAccepted - countOngoing;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-500 p-5 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white rounded-2xl p-10 mb-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
            🐧 Linux Kernel Contributions
          </h1>
          {/* <p className="text-gray-600 mt-2">
            LFX Mentorship Summer 2025 — Abinash Singh Lalotra
          </p> */}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <StatCard number={patches.length} label="Total Patches" />
            <StatCard number={countAccepted} label="✅ Accepted Family" />
            <StatCard number={countOngoing} label="⏳ Ongoing" />
            <StatCard number={countNotAccepted} label="🚫 Not Accepted" />
          </div>
        </header>

        <div className="flex flex-wrap gap-2 bg-white rounded-xl p-4 shadow-md mb-6">
          {["all", "accepted", "ongoing", "not accepted"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-5 py-2 border-2 border-indigo-500 rounded-full text-sm font-semibold transition-all ${
                filter === s
                  ? "bg-indigo-500 text-white"
                  : "text-indigo-500 hover:bg-indigo-100"
              }`}
            >
              {statusLabel(s)}{" "}
              ({s === "all"
                ? patches.length
                : s === "accepted"
                ? countAccepted
                : s === "ongoing"
                ? countOngoing
                : countNotAccepted})
            </button>
          ))}
        </div>

        <div className="grid gap-5">
          {filtered.map((patch, i) => (
            <PatchCard key={i} patch={patch} />
          ))}
        </div>

        <Lessons />
      </div>
    </div>
  );
}

function normalizeStatus(status: string | undefined): string {
  if (!status) return "not accepted";
  const s = status.trim().toLowerCase().replace(/\s+/g, "-");
  if (s.includes("accept")) return "accepted";
  if (s.includes("sign")) return "signed-off-by";
  if (s.includes("review")) return "reviewed-by";
  if (s.includes("report")) return "reported-by";
  if (s.includes("ongoing")) return "ongoing";
  return "not accepted";
}


function StatCard({ number, label }: { number: number; label: string }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 p-4 rounded-xl text-center shadow">
      <div className="text-3xl font-bold text-indigo-600">{number}</div>
      <div className="text-gray-600 text-sm mt-1">{label}</div>
    </div>
  );
}

function PatchCard({ patch }: { patch: Patch }) {
  const { status, title, commit, link, commit_link } = patch;
  const badgeColor =
    statusColors[status.toLowerCase()] || "bg-gray-200 text-gray-700";

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-indigo-500 hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
        <h2 className="font-semibold text-lg text-indigo-600 flex-1">{title}</h2>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full uppercase ${badgeColor}`}
        >
          {statusLabel(status)}
        </span>
      </div>

      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="block text-indigo-500 font-semibold text-sm hover:underline mb-3"
      >
        View on Lore →
      </a>

      {commit && (
        <div className="bg-indigo-50 text-indigo-700 text-xs font-mono p-2 rounded mb-3">
          Commit: {commit}
        </div>
      )}

      {commit_link && (
        <a
          href={commit_link}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-500 text-xs font-medium hover:underline"
        >
          View Commit →
        </a>
      )}
    </div>
  );
}

function Lessons() {
  const lessons = [
    ["Stack usage matters", "Reduce stack frame size by moving large structs to heap."],
    ["Code cleanup is valuable", "Removing redundant code improves maintainability."],
    ["Upstreaming is iterative", "Even dropped patches teach valuable review insights."],
    ["Subsystems behave differently", "Context and conventions vary across kernel drivers."],
    ["Tooling helps, but isn’t perfect", "KMSAN and syzbot can produce false positives."],
    ["Communication matters", "Clear commit messages and polite mailing list replies are key."],
  ];

  return (
    <div className="bg-white rounded-2xl p-8 mt-8 shadow-md">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
        🧠 Lessons Learned
      </h2>
      {lessons.map(([title, text], i) => (
        <div key={i} className="border-b last:border-0 py-3">
          <div className="font-semibold text-gray-800">{title}</div>
          <p className="text-gray-600 text-sm mt-1">{text}</p>
        </div>
      ))}
    </div>
  );
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    all: "All",
    accepted: "✅ Accepted",
    ongoing: "⏳ Ongoing",
    "not accepted": "🚫 Not Accepted",
    "signed-off-by": "🟢 Signed-off",
    "reviewed-by": "🔵 Reviewed",
    "reported-by": "🟠 Reported",
  };
  return map[status.toLowerCase()] || status;
}
