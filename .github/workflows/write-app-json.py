import requests
import argparse
import json
from pathlib import Path

def get_app_categories(app):
    """
    Get the categories of the app
    Args:
        app (str): Application name
    Returns:
        list: List of categories
    """
    url = "https://raw.githubusercontent.com/NeuroDesk/neurocommand/refs/heads/main/neurodesk/apps.json"
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch apps: {menu_entries.status_code} {menu_entries.text}")
    menu_entries = response.json()
    for key, value in menu_entries.items():
        if app in key:
            return menu_entries[key]['categories']
        else:
            for sub_key, sub_value in value['apps'].items():
                if app in sub_key:
                    return menu_entries[key]['categories']
    print(f"Categories not found for {app}")
    return []
    
def get_apps():
    """
    Get the categories of the app
    Args:
        app (str): Application name
    Returns:
        list: List of categories
    """
    url = "https://raw.githubusercontent.com/NeuroDesk/neurocommand/refs/heads/main/neurodesk/apps.json"
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch apps: {menu_entries.status_code} {menu_entries.text}")
    menu_entries = response.json()
    app_list = []
    for menu_name, menu_data in menu_entries.items():
        for app_name, app_data in menu_data.get("apps", {}).items():
            if app_data.get("exec") == "":
                IMAGENAME_VERSION = app_name.split(" ")[0] + "_" + app_name.split(" ")[-1] + "_" + app_data.get("version")
                app_list.append(IMAGENAME_VERSION)
    return app_list

def write_to_file(zenodo_token, filename):
    """
    Write the list of DOIs from Zenodo to applist.json
    Args:
        zenodo_token (str): Zenodo token
        filename (str): Filename to write to
    """
    # Fetch the list of DOIs from Zenodo
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
    app_list = get_apps()
    # Write application, categories, doi, and doi_url to applist.json file
    my_dict = {}
    val = []
    for app in app_list:

        categories = get_app_categories(app.split("_")[0])

        for deposition in depositions:
            if 'title' not in deposition or 'doi' not in deposition or 'doi_url' not in deposition:
                print(f"Skipping DOI: {deposition['title']}")
                continue
            if app in deposition['title']:
                print(f"Processing DOI: {deposition['title']}")
                doi = deposition['doi']
                doi_url = deposition['doi_url']
                val.append({"application": app, "categories": categories, "doi": doi, "doi_url": doi_url})
                break
        val.append({"application": app, "categories": categories})

    my_dict['list'] = val
    with open(filename, 'w') as fp:     
        json.dump(my_dict, fp, sort_keys=True, indent=4)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        prog="Get Published DOIs from Zenodo",
    )

    parser.add_argument("--zenodo_token", type=str, required=True, help="Zenodo token")
    args = parser.parse_args()

    filename = Path(__file__).parent.parent.parent / "assets" / "js" / "applist.json"
    print(f"Writing to {filename}")
    write_to_file(args.zenodo_token, filename)