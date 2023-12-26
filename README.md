### Hexlet tests and linter status:
[![Actions Status](https://github.com/dkalabukhov/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/dkalabukhov/frontend-project-46/actions)

[![Node CI](https://github.com/dkalabukhov/frontend-project-46/actions/workflows/node-check.yml/badge.svg)](https://github.com/dkalabukhov/frontend-project-46/actions/workflows/node-check.yml)

[![Maintainability](https://api.codeclimate.com/v1/badges/4ae2b2a1fd2eda19d1c4/maintainability)](https://codeclimate.com/github/dkalabukhov/frontend-project-46/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/4ae2b2a1fd2eda19d1c4/test_coverage)](https://codeclimate.com/github/dkalabukhov/frontend-project-46/test_coverage)

# Difference checker
This is a console utility for comparising two objects. The utility accepts objects in the following formats: JSON, YML and YAML.

# Example of usage
[![asciicast](https://asciinema.org/a/628619.svg)](https://asciinema.org/a/628619)

# Installation
```bash
git clone git@github.com:dkalabukhov/frontend-project-46.git
cd frontend-project-46
make install
npm link
```

# Usage
```bash
gendiff [options] <filepath1> <filepath2>
An example: gendiff -f plain file1.json file2.yaml
```

```bash
options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```

The program can display differences in three formats, the default format is stylish. Antother two formats are plain and json. To display the result according to a specific format, enter -f [format]

```bash
gendiff -f plain file1.json file2.yaml
```

An example of this output:
```bash
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```
