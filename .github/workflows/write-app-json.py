import requests
import argparse
import json
from pathlib import Path

def get_app_categories(app):
    """
    Get the categories of the app
    """
    url = "https://raw.githubusercontent.com/NeuroDesk/neurocommand/refs/heads/main/neurodesk/apps.json"
    response = requests.get(url).json()
    print(f"Fetching categories for {app}")
    for key, value in response.items():
        print(f"Checking {key} {value}")
        if app in key:
            print(f"Found categories for {app}")
            return response[key]['categories']
        else:
            for sub_key, sub_value in value['apps'].items():
                if app in sub_key:
                    print(f"Found categories for {sub_key}")
                    return response[key]['categories']
    print(f"Categories not found for {app}")
    return []
    
def write_to_file(zenodo_token, filename):
    """
    Fetch the list of DOIs from Zenodo
    """
    page = 1
    params = {
        "access_token": zenodo_token,
        "status": "published",
        "page": 1,
        "size": 100,
    }
    url = "https://sandbox.zenodo.org/api/deposit/depositions"
    response = requests.get(url, params=params)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch DOIs: {response.status_code} {response.text}")
    depositions = response.json()

    while 'next' in response.links:
        page += 1
        params = {
            "access_token": zenodo_token,
            "status": "published",
            "page": page,
            "size": 100,
        }
        # print(f"Fetching next page of packages from Github", response.links['next']['url'], params, page)
        response=requests.get(url, params=params)

        if response.status_code != 200:
            raise Exception(f"Failed to fetch DOIs: {response.status_code} {response.text}")
        # print(f"Fetched {len(response.json())} packages from Github", response.json())
        depositions.extend(response.json())

    my_dict = {}
    val = []

    for deposition in depositions:
        if 'title' not in deposition or 'doi' not in deposition or 'doi_url' not in deposition:
            print(f"Skipping DOI: {deposition['title']}")
            continue
        print(f"Processing DOI: {deposition['title']}")
        categories = get_app_categories(deposition['title'].split("_")[0])
        title = deposition['title']
        doi = deposition['doi']
        doi_url = deposition['doi_url']
        val.append({"application": title, "categories": categories, "doi": doi, "doi_url": doi_url})
    my_dict['list'] = val
    with open(filename, 'w') as fp:     
        json.dump(my_dict, fp, sort_keys=True, indent=4)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        prog="Get Github Packages with Tags or Published DOIs from Zenodo",
    )

    parser.add_argument("--zenodo_token", type=str, required=True, help="Zenodo token")
    args = parser.parse_args()

    filename = Path(__file__).parent.parent.parent / "assets" / "js" / "applist.json"
    print(f"Writing to {filename}")
    write_to_file(args.zenodo_token, filename)