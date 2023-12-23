install:
	npm ci

test:
	npm test

run:
	node bin/gendiff __fixtures__/file1.json __fixtures__/file2.json

lint:
	npx eslint .

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
	npm link