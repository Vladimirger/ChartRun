#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
#include <string>
#include <tuple>
#include <set>
#include <utility>
#include "json.hpp"
#include "compile.hpp"
using namespace std;

int main(){
    int start;
    string json_input;
    vector<vector<int>> adj;
    vector<pair<int, string>> properties;
    getline(cin, json_input);
    cout << json_input << endl;
    try{
        nlohmann::json json_data = nlohmann::json::parse(json_input);
        adj = json_data["adjacencyList"].get<vector<vector<int>>>();
        properties.resize(adj.size());
        for(auto& item : json_data["properties"]){
            int first = item[0];
            int second = item[1];
            string third = item[2];
            if(first == -1)continue;
            
            properties[first] =  {second, third};
        }
    }catch(const nlohmann::json::parse_error& e){
        cerr << "Invalid JSON: " << e.what();
        return 1;
    }catch(const nlohmann::json::type_error& e){
        cerr << "Type mismatch in JSON" << e.what();
        return 1;
    }
    cout << "Adjacency List:" << endl;
    for (const auto& row : adj) {
        for (int val : row) {
            cout << val << " ";
        }
        cout << endl;
    }

    cout << "Properties:" << endl;
    for (const auto& prop : properties) {
        cout << prop.first << " " << prop.second << "\n";
    }

    return 0;
}