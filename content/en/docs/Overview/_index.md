---
title: "Neurodesk Overview"
linkTitle: "Overview"
weight: 1
aliases:
- /docs/overview/
- /docs
description: >
  A flexible, scalable and easy to use data analysis environment for reproducible neuroimaging.
---

## What is Neurodesk?
Neurodesk provides a containerised data analysis environment to facilitate reproducible analysis of neuroimaging data. At Neurodesk, we believe that reproducibility should be a fundamental principle underlying neuroscientific data analysis (1). Analysis pipelines for neuroimaging data typically rely on specific versions of packages and software, and are dependent on their native operating system. These dependencies mean that a working analysis pipeline may fail or produce different results on a new computer, or even on the same computer after a software update. Neurodesk provides a platform in which anyone, anywhere, using any computer can reproduce your original research findings given the original data and analysis code. 

The Neurodesk environment relies on software containers and allows users to build and use containers to analyse neuroimaging data. Containers can be compared to virtual machines, in that they allow users to create a virtual, isolated computing environment with an operating system separate to that of the host machine. However, containers differ from virtual machines in that they virtualise software rather than hardware. Practically, this means that container images require few system resources to install, start-up quickly, and are easily portable between computers. 

We recommend watching [this excellent short video](https://www.youtube.com/watch?v=HelrQnm3v4g) from the Australian Research Data Commons (ARDC) on research applications of software containers. 
To read more about Docker containers, visit [the Docker webpage](https://www.docker.com/resources/what-container)  

#### More information: 
- A 2 minute video explaining Neurodesk: [Neurodesk in 2 minutes](https://www.youtube.com/watch?v=JLv_5fycugw)
- A 4 minute video getting started with Neurodesk: [Neurodesk in 4 minutes](https://www.youtube.com/watch?v=BffOZcV2oaY&ab_channel=NeuroDesk)
- An online interactive demo you can try RIGHT NOW in your browser: https://play.neurodesk.org/

#### In-depth information:
- A 15 minute video explaining what Neurodesk is: [Neurodesk in 15 minutes](https://youtu.be/2ATgTOsiGdY)
- A 30 minute video explaining Open Data processing in Neurodesk: [MRItogether data management](https://www.youtube.com/live/bbSDNSzLftI?feature=share&t=1159)
- A 35 minute video explaining the technical details of Neurodesk: [Neurodesk in 35 minutes - behind the scenes](https://youtu.be/V5gAA9NiX_s)
- A 50 minute video explaining the goals and implementation details of Neurodesk, Neurodesktop and AEDAPT: [ARDC TechTalk](https://drive.google.com/file/d/1Dmtj6jpE1jcAt63kv2KhPL7WuuQxnsPg/view),[Slides](https://docs.google.com/presentation/d/15a_Uj_ZqL4OH9xd_QFtGk4HFWTqzqkcYXzPfz2fSw0s/present?slide=id.g11ecd613955_0_543)
- A 1 hour video showcasing Neurodesk live and explaining the background: [ReproNim Webinar](https://www.youtube.com/watch?v=HY-TqE6I2oo)
- A video explaining using Neurodesk for open data and open analysis: [OHBM Webinar](https://youtu.be/RTy5iVHHGO8?si=1XWcBuDlC7jdzhSo&t=3350)
- A video on Neurodesk's development journey and lessons learned: [MRItogether 2024, journey](https://www.youtube.com/watch?v=KJh_cr1uAi0&list=PLeDygc8TN_J5TKU7Z06ucjkvsfEYI6_AJ&index=7)
- A Neurodesk overview and live demo: [MRItogether 2024, live demo](https://www.youtube.com/watch?v=B7GmyHpJUDo&list=PLeDygc8TN_J5TKU7Z06ucjkvsfEYI6_AJ&index=17)
- A video on how data can be converted into BIDS using Neurodesk: [MRItogether 2024, bids](https://www.youtube.com/watch?v=uXrgS3FOzAg&list=PLeDygc8TN_J5TKU7Z06ucjkvsfEYI6_AJ&index=19)

## What applications are included in Neurodesk?
You can check out the complete list of [these applications](/docs/overview/applications)

## How should I cite the tools I am using and Neurodesk itself?
[See here](/docs/overview/how-to-cite-us)

## Background
Neurodesk originates from various projects at the Centre for Advanced Imaging that enabled running neuroimaging tools on HPCs and Linux workstations using software containers. The ideas and code from projects like ["DICOM2CLOUD"](https://github.com/CAIsr/dicom2cloud). ["transparent singularity"](https://github.com/CAIsr/transparent-singularity) and ["CAID"](https://github.com/CAIsr/caid) were combined during a [hackathon project](https://github.com/ohbm/hackathon2020/issues/177) to create a ["Virtual Neuro Machine"](https://docs.google.com/presentation/d/1FCtrRCZrj-5nLmnIIpVFYYYXuMAoUf-B/edit?usp=sharing&ouid=100303589348027986473&rtpof=true&sd=true). The project was later renamed to Neurodesk and further developments were funded through the ARDC platform project "AEDAPT" with the goal to create a national platform for reproducible electrophysiology data analysis and sharing, accessible to all Australian researchers across a wide range of disciplines that conduct electrophysiological research.

## References

1. National Academies of Sciences, Engineering, and Medicine. 2019. Reproducibility and Replicability in Science. Washington, DC: The National Academies Press. https://doi.org/10.17226/25303.

MIT License

Copyright (c) 2021 NeuroDesk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
