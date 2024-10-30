---
title: "Open Recon"
linkTitle: "Open Recon"
description: >
  Neurodesktop containers can be used in Open Recon
---

## 1) add the installation of the Python MRD server to any recipe in https://github.com/NeuroDesk/neurocontainers
Make sure to adjust invertcontrast.py to your pipeline needs (or replace/rename other files from the [Python MRD server](https://github.com/kspaceKelvin/python-ismrmrd-server):
```bash
--workdir='/opt/code' \
--install build-essential libxslt1.1 libhdf5-103 libboost-program-options1.74.0 libpugixml1v5 vim dos2unix git cmake g++ libhdf5-dev libxml2-dev libxslt1-dev libboost-all-dev libfftw3-dev libpugixml-dev \
--run='git clone https://github.com/ismrmrd/ismrmrd.git && \
  cd ./ismrmrd && \
  cmake . && \
  make -j $(nproc) && \
  make install' \
--run='git clone https://github.com/ismrmrd/siemens_to_ismrmrd.git && \
  cd siemens_to_ismrmrd && \
  mkdir build && \
  cd build && \
  cmake .. && \
  make -j $(nproc) && \
  make install' \
--run='pip3 install h5py ismrmrd matplotlib pydicom pynetdicom nibabel' \
--run='git clone https://github.com/ismrmrd/ismrmrd-python-tools.git && \
  cd ismrmrd-python-tools && \
  pip3 install --no-cache-dir .' \
--run='git clone https://github.com/kspaceKelvin/python-ismrmrd-server && \
  find /opt/code/python-ismrmrd-server -name "*.sh" -exec chmod +x {} \; && \
  find /opt/code/python-ismrmrd-server -name "*.sh" | xargs dos2unix' \
--copy invertcontrast.py /opt/code/python-ismrmrd-server/invertcontrast.py \
```

## 2) test the tool inside the container on its own first and then test through MRD server 
convert dicom data to mrd test data:
```bash
cd /opt/code/python-ismrmrd-server
python3 dicom2mrd.py -o input_data.h5 PATH_TO_YOUR_DICOM_FILES
```

start server and client and test application:
```bash
python3 /opt/code/python-ismrmrd-server/main.py -v -r -H=0.0.0.0 -p=9002 -s -S=/tmp/share/saved_data &
# wait until you see Serving ... and the press ENTER
python3 /opt/code/python-ismrmrd-server/client.py -G dataset -o openrecon_output.h5 input_data.h5
```

## 3) submit the container to the https://github.com/NeuroDesk/openrecon/ repository
follow the template instructions
