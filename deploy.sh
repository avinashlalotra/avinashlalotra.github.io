
# Run if tree is clean 
if [ -z "$(git status --porcelain)" ]; then
  echo "✅ Working tree clean"
else
  echo "⚠️  Uncommitted changes found"
  exit
fi

npm run build
git checkout deployment
cp -r dist/* .
git add .
git commit -s
git push
git checkout main
