---
title: "Using Git"
linkTitle: "Using Git"
weight: 2
description: >
  Contribution workflow using Git 
---

# Working copies

When you work on Neurocontainers code, there are three copies of the Neurocontainers Git
repository that you are generally concerned with:

- The `upstream` remote. This is the [official Neurocontainers
  repository](https://github.com/NeuroDesk/neurocontainers) on GitHub. You probably
  don't have write access to this repository.
- The **origin** remote: Your personal remote repository on GitHub.
  You'll use this to share your code and create [pull requests](../pull_request).
- local copy: This lives on your laptop or your remote dev instance,
  and is what you'll use to make changes and create commits.

When you work on Neurocontainers code, you will end up moving code between
the various working copies.

## Workflows

Sometimes you need to get commits. Here are some scenarios:

- You may fork the official Neurocontainers repository to your GitHub fork.
- You may fetch commits from the official Neurocontainers repository to your local copy.
- You occasionally may fetch commits from your forked copy.

Sometimes you want to publish commits. Here are some scenarios:

- You push code from your local copy to your GitHub fork. (You usually
  want to put the commit on a feature branch.)
- You submit a PR to the official Neurocontainers repo.

Finally, the NeuroDesk core team will occasionally want your changes!

- The NeuroDesk core team can accept your changes and add them to
  the official repo, usually on the `master` branch.

## Relevant Git commands

The following commands are useful for moving commits between
working copies:

- `git fetch`: This grabs code from another repository to your local
  copy. (Defaults to fetching from your default remote, `origin`).
- `git fetch upstream`: This grabs code from the upstream repository to your local copy.
- `git push`: This pushes code from your local repository to one of the remotes.
- `git remote`: This helps you configure short names for remotes.
- `git pull`: This pulls code, but by default creates a merge commit
  (which you definitely don't want). However, if you've followed our
  [cloning documentation](../cloning), this will do
  `git pull --rebase` instead, which is the only mode you'll want to
  use when working on Neurodesk.


## Know what branch you're working on

When using Git, it's important to know which branch you currently have checked
out because most Git commands implicitly operate on the current branch. You can
determine the currently checked out branch several ways.

One way is with [git status][gitbook-git-status]:

```console
$ git status
On branch newapp
nothing to commit, working directory clean
```

Another is with [git branch][gitbook-git-branch] which will display all local
branches, with a star next to the current branch:

```console
$ git branch
* newapp
  master
```

To see even more information about your branches, including remote branches,
use `git branch -vva`:

```console
$ git branch -vva
* civet_2.1.1                             f736814 [origin/civet_2.1.1] set DEPLOY_PATH
  master                                  a0f0455 [origin/master] Merge pull request #129
  remotes/origin/cat12_with_neurodocker   763f6de works :)
  remotes/origin/civet_2.1.1              f736814 set DEPLOY_PATH
  remotes/origin/master                   a0f0455 Merge pull request #129
```

You can also configure [Bash][gitbook-other-envs-bash] and
[Zsh][gitbook-other-envs-zsh] to display the current branch in your prompt.

## Keep your fork up to date

You'll want to [keep your fork][github-help-sync-fork] up-to-date with changes
from Neurocontainers's master repositories.

**Note about `git pull`**: Rather than using `git pull`, which by default is a shortcut for `git fetch && git merge FETCH_HEAD` ([docs][gitbook-git-pull]), you
should use `git pull --rebase`, which is like `git fetch` and then `git rebase`.

First, [fetch][gitbook-fetch] changes from Neurocontainers's upstream repository you
configured in the step above:

```console
$ git fetch upstream
```

Next, check out your `master` branch and [rebase][gitbook-git-rebase] it on top
of `upstream/master`:

```console
$ git checkout master
Switched to branch 'master'

$ git rebase upstream/master
```

This will rollback any changes you've made to `master`, update it from
`upstream/master`, and then re-apply your changes. Rebasing keeps the commit
history clean and readable.

When you're ready, [push your changes][github-help-push] to your remote fork.
Make sure you're in branch `master` and then run `git push`:

```console
$ git checkout master
$ git push origin master
```

You can keep any branch up to date using this method. If you're working on a
feature branch (see next section), which we recommend, you would change the
command slightly, using the name of your `feature-branch` rather than `master`:

```console
$ git checkout feature-branch
Switched to branch 'feature-branch'

$ git rebase upstream/master

$ git push origin feature-branch
```

## Work on a feature branch

One way to keep your work organized is to create a branch for each issue or
feature. You can and should create as many branches as you'd like.

First, make sure your `master` branch is up-to-date with Neurocontainers upstream ([see
how][git-guide-up-to-date]).

Next, from your `master` branch, create a new tracking branch, providing a
descriptive name for your feature branch:

```console
$ git checkout master
Switched to branch 'master'

$ git checkout -b issue-1755-fail2ban
Switched to a new branch 'issue-1755-fail2ban'
```

Alternatively, you can create a new branch explicitly based off
`upstream/master`:

```console
$ git checkout -b issue-1755-fail2ban upstream/master
Switched to a new branch 'issue-1755-fail2ban'
```

Now you're ready to work on the issue or feature.


## Stage changes

Recall that files tracked with Git have three possible states:
committed, modified, and staged.

To prepare a commit, first add the files with changes that you want
to include in your commit to your staging area. You _add_ both new files and
existing ones. You can also remove files from staging when necessary.

### Get status of working directory

To see which files in the working directory have changes that have not been
staged, use `git status`.

If you have no changes in the working directory, you'll see something like
this:

```console
$ git status
On branch issue-123
nothing to commit, working directory clean
```

If you have unstaged changes, you'll see something like this:

```console
On branch issue-123
Untracked files:
  (use "git add <file>..." to include in what will be committed)

        build.sh

nothing added to commit but untracked files present (use "git add" to track)
```

### Stage additions with `git add`

To add changes to your staging area, use `git add <filename>`. Because
`git add` is all about staging the changes you want to commit, you use
it to add _new files_ as well as _files with changes_ to your staging
area.

Continuing our example from above, after we run `git add build.sh`, we'll see
the following from `git status`:

```console
On branch issue-123
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   build.sh
```

You can view the changes in files you have staged with `git diff --cached`. To
view changes to files you haven't yet staged, just use `git diff`.

If you want to add all changes in the working directory, use `git add -A`
([documentation][gitbook-add]).

You can also stage changes using your Github GUI.

If you stage a file, you can undo it with `git reset HEAD <filename>`. Here's
an example where we stage a file `build.sh` and then unstage it:

```console
$ git add build.sh
On branch issue-1234
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   build.sh

$ git reset HEAD build.sh
$ git status
On branch issue-1234
Untracked files:
  (use "git add <file>..." to include in what will be committed)

        build.sh

nothing added to commit but untracked files present (use "git add" to track)
```

### Stage deletions with `git rm`

To remove existing files from your repository, use `git rm`
([documentation][gitbook-rm]). This command can either stage the file for
removal from your repository AND delete it from your working directory or just
stage the file for deletion and leave it in your working directory.

To stage a file for deletion and **remove** it from your working directory, use
`git rm <filename>`:

```console
$ git rm test.txt
rm 'test.txt'

$ git status
On branch issue-1234
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        deleted:    test.txt

$ ls test.txt
ls: No such file or directory
```

To stage a file for deletion and **keep** it in your working directory, use
`git rm --cached <filename>`:

```console
$ git rm --cached test2.txt
rm 'test2.txt'

$ git status
On branch issue-1234
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        deleted:    test2.txt

$ ls test2.txt
test2.txt
```

If you stage a file for deletion with the `--cached` option, and haven't yet
run `git commit`, you can undo it with `git reset HEAD <filename>`:

```console
$ git reset HEAD test2.txt
```

Unfortunately, you can't restore a file deleted with `git rm` if you didn't use
the `--cache` option. However, `git rm` only deletes files it knows about.
Files you have never added to Git won't be deleted.

## Commit changes

When you've staged all your changes, you're ready to commit. You can do this
with `git commit -m "My commit message."` to include a commit message.

Here's an example of committing with the `-m` for a one-line commit message:

```console
$ git commit -m "Add a test commit for docs."
[issue-123 173e17a] Add a test commit for docs.
 1 file changed, 1 insertion(+)
 create mode 100644 newfile.py
```

You can also use `git commit` without the `-m` option and your editor to open,
allowing you to easily draft a multi-line commit message.

How long your commit message should be depends on where you are in your work.
Using short, one-line messages for commits related to in-progress work makes
sense. For a commit that you intend to be final or that encompasses a
significant amount or complex work, you should include a longer message.

Keep in mind that your commit should contain a 'minimal coherent idea' and have
a quality commit message.

Here's an example of a longer commit message that will be used for a pull request:

```text
Add CIVET 2.1.1 container.

Edit build.sh and README.md to build container for CIVET 2.1.1

Tested on my local Ubuntu development server, but need to test within Neurodesktop.

Fixes #1755.
```

The first line is the summary. The following paragraphs are full prose and 
explain why and how the change was made. It explains what testing was done 
and asks specifically for further testing. The final paragraph indicates 
that this commit addresses and fixes issue #1755.
When you submit your pull request, GitHub will detect and link this reference
to the appropriate issue. Once your commit is merged into `upstream/master`, GitHub
will automatically close the referenced issue. See [Closing issues via commit
messages][github-help-closing-issues] for details.

Note in particular that GitHub's regular expressions for this feature
are sloppy, so phrases like `Partially fixes #1234` will automatically
close the issue. Phrases like `Fixes part of #1234` are a good
alternative.

Make as many commits as you need to address the issue or implement your feature.

## Push your commits to GitHub

As you're working, it's a good idea to frequently push your changes to GitHub.
This ensures your work is backed up should something happen to your local
machine and allows others to follow your progress. It also allows you to
[work from multiple computers][self-multiple-computers] without losing work.

Pushing to a feature branch is just like pushing to `master`:

```console
$ git push origin <branch-name>
Counting objects: 6, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (6/6), 658 bytes | 0 bytes/s, done.
Total 6 (delta 3), reused 0 (delta 0)
remote: Resolving deltas: 100% (3/3), completed with 1 local objects.
To git@github.com:christi3k/neurocontainers.git
 * [new branch]      issue-demo -> issue-demo
```

If you want to see what Git will do without actually performing the push, add
the `-n` (dry-run) option: `git push -n origin <branch-name>`. If everything
looks good, re-run the push command without `-n`.

If the feature branch does not already exist on GitHub, it will be created when
you push and you'll see `* [new branch]` in the command output.

## Examine and tidy your commit history

Examining your commit history prior to submitting your pull request is a good
idea. Will the person reviewing your commit history be able to clearly understand 
your progression of work?

On the command line, you can use the `git log` command to display an easy to
read list of your commits:

```console
$ git log --all --graph --oneline --decorate

* 4f8d75d (HEAD -> 1754-docs-add-git-workflow) docs: Add details about configuring Travis CI.
* bfb2433 (origin/1754-docs-add-git-workflow) docs: Add section for keeping fork up-to-date to Git Guide.
* 4fe10f8 docs: Add sections for creating and configuring fork to Git Guide.
* 985116b docs: Add graphic client recs to Git Guide.
* 3c40103 docs: Add stubs for remaining Git Guide sections.
* fc2c01e docs: Add git guide quickstart.
| * f0eaee6 (upstream/master) bug: Fix traceback in get_missed_message_token_from_address().
```

Alternatively, use your graphical client to view the history for your feature branch.

If you need to update any of your commits, you can do so with an interactive
[rebase][github-help-rebase]. Common reasons to use an interactive rebase
include:

- squashing several commits into fewer commits
- splitting a single commit into two or more
- rewriting one or more commit messages

There is ample documentation on how to rebase, so we won't go into details
here. We recommend starting with GitHub's help article on
[rebasing][github-help-rebase] and then consulting Git's documentation for
[git-rebase][gitbook-git-rebase] if you need more details.

If all you need to do is edit the commit message for your last commit, you can
do that with `git commit --amend`. See [Git Basics - Undoing
Things][gitbook-basics-undoing] for details on this and other useful commands.

## Force-push changes to GitHub after you've altered your history

Any time you alter history for commits you have already pushed to GitHub,
you'll need to prefix the name of your branch with a `+`. Without this, your
updates will be rejected with a message such as:

```console
$ git push origin 1754-docs-add-git-workflow
To git@github.com:christi3k/neurocontainers.git
 ! [rejected] 1754-docs-add-git-workflow -> 1754-docs-add-git-workflow (non-fast-forward)
error: failed to push some refs to 'git@github.com:christi3k/neurocontainers.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

Re-running the command with `+<branch>` allows the push to continue by
re-writing the history for the remote repository:

```console
$ git push origin +1754-docs-add-git-workflow
Counting objects: 12, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (12/12), done.
Writing objects: 100% (12/12), 3.71 KiB | 0 bytes/s, done.
Total 12 (delta 8), reused 0 (delta 0)
remote: Resolving deltas: 100% (8/8), completed with 2 local objects.
To git@github.com:christi3k/neurocontainers.git
 + 2d49e2d...bfb2433 1754-docs-add-git-workflow -> 1754-docs-add-git-workflow (forced update)
```

This is perfectly okay to do on your own feature branches, especially if you're
the only one making changes to the branch. If others are working along with
you, they might run into complications when they retrieve your changes because
anyone who has based their changes off a branch you rebase will have to do a
complicated rebase.

[gitbook-add]: https://git-scm.com/docs/git-add
[gitbook-basics-undoing]: https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things
[gitbook-fetch]: https://git-scm.com/docs/git-fetch
[gitbook-git-branch]: https://git-scm.com/docs/git-branch
[gitbook-git-pull]: https://git-scm.com/docs/git-pull
[gitbook-git-rebase]: https://git-scm.com/docs/git-rebase
[gitbook-git-status]: https://git-scm.com/docs/git-status
[gitbook-other-envs-bash]: https://git-scm.com/book/en/v2/Git-in-Other-Environments-Git-in-Bash
[gitbook-other-envs-zsh]: https://git-scm.com/book/en/v2/Git-in-Other-Environments-Git-in-Zsh
[gitbook-rm]: https://git-scm.com/docs/git-rm
[github-help-closing-issues]: https://help.github.com/en/articles/closing-issues-via-commit-messages
[github-help-push]: https://help.github.com/en/articles/pushing-to-a-remote
[github-help-rebase]: https://help.github.com/en/articles/using-git-rebase
[github-help-sync-fork]: https://help.github.com/en/articles/syncing-a-fork
[self-multiple-computers]: ../troubleshooting#working-from-multiple-computers
[git-guide-up-to-date]: #keep-your-fork-up-to-date