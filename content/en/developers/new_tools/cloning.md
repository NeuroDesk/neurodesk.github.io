---
title: "Clone Repo"
linkTitle: "Clone Repo"
weight: 1
description: >
  Clone neurocontainer code

---

Neurocontainers uses a **forked-repo** and **[rebase][gitbook-rebase]-oriented
workflow**. This means that all contributors create a fork of the [neurocontainer
repository][github-neurocontainers] they want to contribute to and then submit pull
requests to the upstream repository to have their contributions reviewed and
accepted. We also recommend you work on feature branches.

## Step 1a: Create your fork

The following steps you'll only need to do the first time you set up a machine
for contributing to Neurocontainers. You'll need to repeat the steps for
any additional NeuroDesk projects ([list][github-neurodesk]) that you work on.

The first thing you'll want to do to contribute to NeuroDesk is fork ([see
how][github-help-fork]) the appropriate [NeuroDesk repository][github-neurodesk].

## Step 1b: Clone to your machine

Next, clone your fork to your local machine:

```console
$ git clone --config pull.rebase https://github.com/YOUR_USERNAME/neurocontainers.git
Cloning into 'neurocontainers'...
remote: Enumerating objects: 6730, done.
remote: Counting objects: 100% (504/504), done.
remote: Compressing objects: 100% (229/229), done.
remote: Total 6730 (delta 308), reused 423 (delta 269), pack-reused 6226
Receiving objects: 100% (6730/6730), 1.67 MiB | 196.00 KiB/s, done.
Resolving deltas: 100% (4222/4222), done.
```

(The `--config pull.rebase` option configures Git so that `git pull`
will behave like `git pull --rebase` by default. Using
`git pull --rebase` to update your changes to resolve merge conflicts
is expected by essentially all of open source projects. You can also set that option after cloning using
`git config --add pull.rebase true`, or just be careful to always run
`git pull --rebase`, never `git pull`).

Note: If you receive an error while cloning, you may not have [added your ssh
key to GitHub][github-help-add-ssh-key].


## Step 1c: Connect your fork to Neurocontainers upstream

Next you'll want to [configure an upstream remote
repository][github-help-conf-remote] for your fork of Neurocontainers. This will allow
you to [sync changes][github-help-sync-fork] from the main project back into
your fork.

First, show the currently configured remote repository:

```console
$ git remote -v
origin  git@github.com:YOUR_USERNAME/neurocontainers.git (fetch)
origin  git@github.com:YOUR_USERNAME/neurocontainers.git (push)
```

Note: If you've cloned the repository using Github GUI, you may already
have the upstream remote repository configured. For example, when you clone
[NeuroDesk/neurocontainers][github-neurocontainers] with the GitHub desktop client it configures the remote repository `neurocontainer` and you see the following output from
`git remote -v`:

```console
origin  git@github.com:YOUR_USERNAME/neurocontainer.git (fetch)
origin  git@github.com:YOUR_USERNAME/neurocontainer.git (push)
neurocontainers	https://github.com/NeuroDesk/neurocontainers.git (fetch)
neurocontainers	https://github.com/NeuroDesk/neurocontainers.git (push)
```

If your client hasn't automatically configured a remote for NeuroDesk/neurocontainers, you'll need to do it yourself with:

```console
$ git remote add -f upstream https://github.com/NeuroDesk/neurocontainers.git
```

Finally, confirm that the new remote repository, upstream, has been configured:

```console
$ git remote -v
origin	https://github.com/YOUR_USERNAME/neurocontainers.git (fetch)
origin	https://github.com/YOUR_USERNAME/neurocontainers.git (push)
upstream	https://github.com/NeuroDesk/neurocontainers.git (fetch)
upstream	https://github.com/NeuroDesk/neurocontainers.git (push)

```

## Step 2: Set up the Neurocontainers development environment

If you haven't already, now is a good time to install the Neurocontainers development environment
([Add tools][add-tools]). 

## Step 3: Configure continuous integration for your fork

This step is optional, but recommended.

1. Go to your neurocontainers fork.  
2. If Actions tab is missing, go to Settings > Actions. Select Allow all actions. Then Save.  
3. In the actions tab, select “I understand my workflows, go ahead and enable them”

Neurocontainers is configured to use [GitHub Actions][github-actions]
to test and create builds upon each new commit and pull request.
GitHub Actions is the primary CI that runs frontend and backend
tests across a wide range of Ubuntu distributions.

GitHub Actions is free for open source projects and it's easy to
configure for your own fork of neurocontainer. After doing so, GitHub Actions
will run tests for new refs you push to GitHub and email you the outcome
(you can also view the results in the web interface).

Running CI against your fork can help save both your and the
NeuroDesk maintainers time by making it easy to test a change fully before
submitting a pull request. We generally recommend a workflow where as
you make changes, you use a fast edit-refresh cycle running individual
tests locally until your changes work. But then once you've gotten
the tests you'd expect to be relevant to your changes working, push a
branch to run the full test suite in GitHub Actions before
you create a pull request. While you wait for GitHub Actions jobs
to run, you can start working on your next task. When the tests finish,
you can create a pull request that you already know passes the tests.

GitHub Actions will run all the jobs by default on your forked repository.
You can check the `Actions` tab of your repository to see the builds.

[gitbook-rebase]: https://git-scm.com/book/en/v2/Git-Branching-Rebasing
[github-help-add-ssh-key]: https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account
[github-help-conf-remote]: https://help.github.com/en/articles/configuring-a-remote-for-a-fork
[github-help-fork]: https://help.github.com/en/articles/fork-a-repo
[github-help-sync-fork]: https://help.github.com/en/articles/syncing-a-fork
[github-neurocontainers]: https://github.com/NeuroDesk/neurocontainers/
[github-neurodesk]: https://github.com/NeuroDesk/
[github-actions]: https://docs.github.com/en/actions
[add-tools]: https://www.neurodesk.org/developers/new_tools/add_tool/
