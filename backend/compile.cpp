#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
#include <string>
#include <tuple>
#include <set>
#include <utility>
#include "compile.hpp"

using namespace std;
set<pair<int, int>> find_cycles(int& n,  vector<vector<int>>& adj){
    set<pair<int, int>> ans;
    queue<int> q;
    q.push(0);
    vector<int> discovery_time(n, -1); 
    discovery_time[0] = 0;
    while(!q.empty()){
        int s = q.front();
        q.pop();
        for(auto u : adj[s]){
            if(u == -1)continue;
            if(discovery_time[u] != -1){
                ans.insert({u, s});
            }else{
                discovery_time[u] = discovery_time[s] + 1;
                q.push(u);
            }
        }
    }
    return ans;
}
string compile(vector<pair<int, int>>& properties, vector<vector<int>>& adj){
    string ans = "";
    int n = adj.size();
    set<pair<int, int>> cycles = find_cycles(n, adj);
}