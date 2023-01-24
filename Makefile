install:
	npm ci
gendiff:
	node bin/gendiff.js src/file1.json src/file2.json
publish:
	npm publish --dry-run