#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
#include <string>
#include <tuple>
#include <set>
#include <utility>
#include <map>
#include "compile.hpp"

#define max_N 10000

using namespace std;
pair<map<int, int>, map<int, int>> find_cycles(int& n,  vector<vector<int>>& adj){
    pair<map<int, int>, map<int, int>>  ans;
    queue<int> q;
    q.push(0);
    vector<int> discovery_time(n, -1); 
    discovery_time[0] = 0;
    while(!q.empty()){
        int s = q.front();
        q.pop();
        for(auto u : adj[s]){
            if(u >= max_N)u /= max_N;
            if(discovery_time[u] != -1){
                ans.first.insert({u, s});
                ans.second.insert({s, u});
            }else{
                discovery_time[u] = discovery_time[s] + 1;
                q.push(u);
            }
        }
    }
    return ans;
}

bool is_the_start_negative(int i, int&n , vector<vector<int>>& adj){
    int s = max(adj[i][0], adj[i][1]);
    s /= max_N;
    queue<int> q;
    q.push(s);
    vector<bool> vis(n, false);
    vis[s] = true;
    while(!q.empty()){
        int S = q.front();
        q.pop();
        for(auto u : adj[S]){
            if(u >= max_N)u /= 10000;
            if(!vis[u]){
                vis[u] = true;
                q.push(u);
                if(u == i)return true;
            }
        }
    }
    return false;
}

void dfs(int i, int& n, vector<vector<int>>& adj, vector<pair<int, int>>& properties, int& num_of_tabs, vector<bool>& vis, pair<map<int, int>, map<int, int>>& cycles, string& ans){
    for(int i = 0; i < num_of_tabs; i++){
        ans += '\t';
    }
    if(cycles.first.find(i) != cycles.first.end()){
        ans += "while ";
        num_of_tabs++;
        if(properties[i].first == 2){
            bool flag = false;
            if(is_the_start_negative(i, n, adj)){
                ans += "not(";
                flag = true;
            }
            ans += properties[i].second;
            ans += (flag ? ")" : "");
            ans += ":\n";
        }else{
            ans += "True:\n";
            for(int i = 0; i < num_of_tabs; i++){
                ans += '\t';
            }
            ans += properties[i].second;
            ans += "\n";
        }
    }
    else if(properties[i].first == 5){
        ans += "quit()\n";
    }else if(properties[i].first == 1 || properties[i].first == 3){
        ans += properties[i].second;
    }

    for(auto u : adj[i]){
        int curr = u;
        if(u >= max_N)u /= max_N;
        if(vis[u])continue;
        if(adj[i].size() == 2 && cycles.first.find(i) == cycles.first.end()){
            num_of_tabs++;
            if(cycles.second.find(i) == cycles.second.end()){
                if()
            }
            num_of_tabs--;
        }
        ans += '\n';
    }
}
string compile(vector<pair<int, int>>& properties, vector<vector<int>>& adj){
    string ans = "";
    int n = adj.size() + 2;
    pair<map<int, int>, map<int, int>>  cycles = find_cycles(n, adj);//first - start; second - end
    // for(int i = 0; i < n;)
}