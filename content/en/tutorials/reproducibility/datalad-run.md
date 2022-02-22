---
title: "Reproducible script execution with DataLad"
linkTitle: "datalad run"
weight: 1
tags: ["datalad"]
author: Sin Kim
description: >
  Using datalad run, you can precisely record results of your analysis scripts.
---

> _This tutorial was created by Sin Kim._
>
> Github: @AKSoo
>
> Twitter: @SinKim98

In addition to being a convenient method of sharing data, DataLad can also help
you create reproducible analyses by recording how certain result files were
produced (i.e. _provenance_). This helps others (and you!) easily keep track of
analyses and rerun them.

This tutorial will assume you know the basics of navigating the terminal. If
you are not familiar with the terminal at all, check the DataLad Handbook's
[brief guide](http://handbook.datalad.org/en/latest/intro/howto.html).

## Create a DataLad project

A DataLad _dataset_ can be any collection of files in folders, so it could be
many things including an analysis project. Let's go to the Neurodesktop storage
and create a dataset for some project. Open a terminal and enter these commands:

```
$ cd /storage

$ datalad create -c yoda SomeProject
[INFO   ] Creating a new annex repo at /home/user/Desktop/storage/SomeProject
[INFO   ] Running procedure cfg_yoda
[INFO   ] == Command start (output follows) =====
[INFO   ] == Command exit (modification check follows) =====
create(ok): /home/user/Desktop/storage/SomeProject (dataset)
```

{{< alert title="yoda?" >}}`-c yoda` option configures the dataset according to
the [YODA](http://handbook.datalad.org/en/latest/basics/101-127-yoda.html), a
set of intuitive organizational principles for data analyses that works
especially well with version control.{{< /alert >}}

Go in the dataset and check its contents.

```
$ cd SomeProject

$ ls
CHANGELOG.md  README.md  code
```

## Create a script

One of DataLad's strengths is that it assumes very little about your datasets.
Thus, it can work with any other software on the terminal: Python, R, MATLAB,
AFNI, FSL, FreeSurfer, etc. For this tutorial, we will run the simplest Julia
script.

```
$ ml julia

$ cat > code/hello.jl << EOF
println("hello neurodesktop")
EOF
```

{{< alert title="EOF?" >}}For sake of demonstration, we create the script using
built-in Bash terminal commands only (here document that starts after `<< EOF`
and ends when you enter `EOF`), but you may use whatever text editor you are
most comfortable with to create the `code/hello.jl` file.{{< /alert >}}

You may want to test (parts of) your script.

```
$ julia code/hello.jl > hello.txt

$ cat hello.txt
hello neurodesktop
```

## Run and record

Before you run your analyses, you should check the dataset for changes and save
or clean them.

```
$ datalad status
untracked: /home/user/Desktop/storage/SomeProject/code/hello.jl (file)
untracked: /home/user/Desktop/storage/SomeProject/hello.txt (file)

$ datalad save -m 'hello script' code/
add(ok): code/hello.jl (file)
save(ok): . (dataset)
action summary:
  add (ok: 1)
  save (ok: 1)

$ git clean -i
Would remove the following item:
  hello.txt
*** Commands ***
  1: clean    2: filter by pattern    3: select by numbers    4: ask each   5: quit   6: help
What now> 1
Removing hello.txt
```

{{< alert title="git" >}}`git clean` is for removing new, untracked files. For
resetting existing, modified files to the last saved version, you would need
`git reset --hard`.{{< /alert >}}

When the dataset is clean, we are ready to `datalad run`!

```
$ mkdir outputs

$ datalad run -m 'run hello' -o 'outputs/hello.txt' 'julia code/hello.jl > outputs/hello.txt'
[INFO   ] == Command start (output follows) =====
[INFO   ] == Command exit (modification check follows) =====
add(ok): outputs/hello.txt (file)
save(ok): . (dataset)
```

Let's go over each of the arguments:

* `-m 'run hello'`: Human-readable message to record in the dataset log.
* `-o 'outputs/hello.txt'`: Expected output of the script. You can specify
  multiple `-o` arguments and/or use wildcards like `'outputs/*'`. This script
  has no inputs, but you can similarly specify inputs with `-i`.
* `'julia ... '`: The final argument is the command that DataLad will run.

Before getting to the exciting part, let's do a quick sanity check.

```
$ cat outputs/hello.txt
hello neurodesktop
```

## View history and rerun

So what's so good about the extra hassle of running scripts with `datalad run`?
To see that, you will need to pretend you are someone else (or you of future!)
and install the dataset somewhere else. Note that `-s` argument is probably a
URL if you were really someone else.

```
$ cd ~

$ datalad install -s /neurodesktop-storage/SomeProject
install(ok): /home/user/SomeProject (dataset)

$ cd SomeProject
```

Because a DataLad dataset is a Git repository, people who download your dataset
can see exactly how `outputs/hello.txt` was created using Git's logs.

```
$ git log outputs/hello.txt
commit 52cff839596ff6e33aadf925d15ab26a607317de (HEAD -> master, origin/master, origin/HEAD)
Author: Neurodesk User <user@neurodesk.github.io>
Date:   Thu Dec 9 08:31:15 2021 +0000

    [DATALAD RUNCMD] run hello

    === Do not change lines below ===
    {
     "chain": [],
     "cmd": "julia code/hello.jl > outputs/hello.txt",
     "dsid": "1e82813d-856f-4118-b54d-c3823e025709",
     "exit": 0,
     "extra_inputs": [],
     "inputs": [],
     "outputs": [
      "outputs/hello.txt"
     ],
     "pwd": "."
    }
    ^^^ Do not change lines above ^^^
```

Then, using that information, they can re-run the command that created the file
using `datalad rerun`!

```
$ datalad rerun 52cf
[INFO   ] run commit 52cff83; (run hello)
run.remove(ok): outputs/hello.txt (file) [Removed file]
[INFO   ] == Command start (output follows) =====
[INFO   ] == Command exit (modification check follows) =====
add(ok): outputs/hello.txt (file)
action summary:
  add (ok: 1)
  run.remove (ok: 1)
  save (notneeded: 1)
```

{{< alert title="git" >}}In Git, each commit (save state) is assigned a long,
unique machine-generated ID. `52cf` refers to the commit with ID that starts
with those characters. Usually 4 is the minimum needed to uniquely identify a
commit. Of course, this ID is probably different for you, so change this
argument to match your commit.{{< /alert >}}

## See Also

* To learn more basics and advanced applications of DataLad, check out the
  [DataLad Handbook](http://handbook.datalad.org/en/latest/).
* DataLad is built on top of the popular version control tool **Git**. There
  are many great resources on Git online, like this [free book](https://git-scm.com/book/en/v2).
* DataLad is only available on the terminal. For a detailed introduction on the
  Bash terminal, check the [BashGuide](https://mywiki.wooledge.org/BashGuide).
* For even more reproducibility, you can include _containers_ with your dataset
  to run analyses in. DataLad has an extension to support script execution in
  containers. See [here](http://handbook.datalad.org/en/latest/basics/101-133-containersrun.html).
