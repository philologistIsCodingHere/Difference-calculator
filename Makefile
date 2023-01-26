install:
	npm ci
gendiff:
	node bin/gendiff.js __tests__/__fixtures__/file1.yml __tests__/__fixtures__/file2.yml
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npx jest
test-coverage:
	npm test -- --coverage --coverageProvider=v8