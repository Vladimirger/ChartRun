#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
#include <string>
#include <tuple>
#include "json.hpp"
using namespace std;
vector<vector<int>> adj;
vector<tuple<int, int, string>> properties;
int main(){
    string json_input;
    getline(cin, json_input);
    try{
        nlohmann::json json_data = nlohmann::json::parse(json_input);
        adj = json_data["adjencyList"].get<vector<vector<int>>>();
        for(auto& item : json_data["properties"]){
            int first = item[0];
            int second = item[1];
            string third = item[2];
            properties.emplace_back(first, second, third);
        }
    }catch(const nlohmann::json::parse_error& e){
        cerr << "Invalid JSON: " << e.what();
        return 1;
    }catch(const nlohmann::json::type_error& e){
        cerr << "Type mismatch in JSON" << e.what();
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
        cout << get<0>(prop) << ", " << get<1>(prop) << ", " << get<2>(prop) << endl;
    }

    return 0;
}