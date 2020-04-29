# Contributing to Pimp My PR

#### Welcome

We are glad that you are interested to contribute code via pull requests, to
file issues, to help people asking for help, discuss changes, suggest a new
features or add any other value to the project.

## Code of conduct

Before you start working on your first pull request, please discuss the change
you wish to make via issue. Familiarize yourself with our code of conduct.

We expect contributors to act professionally and respectfully
to make our work space safe and welcoming. Be kind. Respect people, their culture, their work.
Listen them. Consider their viewpoint.

## Developing for Pimp My PR

The most important part, to add any value to Pimp My PR you have to follow up this list.
This section describes our methodologies and conventions.

1. Pimp My PR's code organization and the structure bases on [NRWL](nrwl.io), this
   [pdf](//connect.nrwl.io/app/books/enterprise-angular-monorepo-patterns) shows why and how
   we are structuring that way, also this
   [article](//www.softwarearchitekt.at/aktuelles/tactical-domain-driven-design-with-monorepos)
   could help to understand the code organization in this project.

2. Familiarize with Git flow - [read more](//nvie.com/posts/a-successful-git-branching-model/),
   here a [gist](https://gist.github.com/markreid/12e7c2203916b93d23c27a263f6091a0) about rebasing.

3. Check out our [Git guidelines](#git-guidelines). If a commit messages will not follow with these rules the CI
   will be rejecting it.

4. Even the work you are doing is likely to be a trivial effort, file a new issue and discuss
   that with the rest of the team.

5. When your issue was marked as to do, fork the Github repository, create a branch on your Github
   fork of the repository and implement your change.

6. Submit the branch as a PR to relevant Pimp My PR repository.

7. Mark someone to review your code, if you don't know who to ask, check out Github's recommendations.

8. Make sure your PR passes the build at CI.

9. When everything is green and your changes looks good to reviewer, then wait for a feedback from someone from the core team.

## Git guidelines

Make sure your branch's name keep that convention:

    ci/*        // changes to our CI configuration files and script
    feature/*   // a new feature
    bugfix/*    // a bug ifx
    release/*   // a new production release
    hotfix/*    // like a release branch but fix mess at production

Each commit message has to consist a **header**, a **body**, and a **footer**.
The header should strictly follow the special format that consists
of a **type**, a **scope**, and a **subject**:

    <type>(<scope>): <subject>
    <BLANK LINE>
    <body>
    <BLANK LINE>
    <footer>

The header is mandatory and the scope of the header is optional.

Each line of the commit message should be lower then 72 characters.
This makes a message more readable in VCS and various git tools.

The footer should contain a closing reference to an issue.

#### Examples:

```no-highlight
    feat(pmp-web): add a table
```

```no-highlight
    fix(common): add missing import

    There was an error with the dialog caused by the lack of import,
    this is needed for the correct dialog behavior.

    Resolve #842
```

#### Type:

Must be one of the following:

- **build:** Changes the affect that build system or external dependencies
  (example scopes: gulp, broccoli, npm)
- **ci:** Changes to our CI configuration files and scripts
- **docs:** Documentation only changes
- **feat:** A new feature
- **fix:** A bug fix
- **perf:** A code change that improves performance
- **refactor:** A code change that neither fixes a bug nor adds a feature
- **style:** Changes that do not affect the meaning of the code
  (white-space, formatting, missing semi-colons, etc)
- **test:** Adding missing tests or correcting existing tests

#### Scope:

The scope should be the name of the npm package or the project scope affected.
Scopes are project specifics, that’s why you can find supported scopes in the project
source code (in most cases in the README file).

#### Subject:

The subject contains a succinct description of the change:

- use the imperative, present tense: „change” not „changed” nor „changes”
- don’t capitalize the first letter
- no dot (.) at the end

#### Body:

Just as in the subject, use the imperative, present tense:
„change” not „changed” nor „changes”.
The body should include the motivation for the change and contrast it with previous
behavior or more descriptive task description.

#### Footer:

The footer should contain any information about **Breaking Changes** and is also the place to reference
Github issues that this commit **closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.
The rest of the commit message is then used for this.

#### More examples:

```no-highlight
feat($browser): onUrlChange event (popstate/hashchange/polling)

Add new event to $browser:
- forward popstate event if available
- forward hashchange event if popstate not available
- do polling when neither popstate nor hashchange available

Breaks $browser.onHashChange, which was removed (use onUrlChange instead)
```

```no-highlight
fix($compile): couple of unit tests for IE9

Older IEs serialize html uppercased, but IE9 does not...
Would be better to expect case insensitive, unfortunately jasmine does
not allow to user regexps for throw expectations.

Closes #392
Breaks foo.bar api, foo.baz should be used instead
```
