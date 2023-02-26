install:
	npm ci
gendiff:
	node bin/gendiff.js __fixtures__/file1.yaml __fixtures__/file2.yaml --format plain
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npx jest
test-coverage:
	npm test -- --coverage --coverageProvider=v8