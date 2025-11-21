#include <bits/stdc++.h>
using namespace std;

int R, C, M;
int N, K;
vector<string> grid;
unordered_map<char,int> pts;
long long score = 0;
int burstCount = 0;
int remainingCells = 0;

inline bool valid(int r, int c){
    return r>=0 && r<R && c>=0 && c<C;
}

int burst_iter(int sr, int sc, char ch){
    if(!valid(sr,sc) || grid[sr][sc] != ch) return 0;
    int removed = 0;
    stack<pair<int,int>> st;
    st.push({sr,sc});
    grid[sr][sc] = '.';

    while(!st.empty()){
        auto cur = st.top();
        st.pop();
        int r = cur.first, c = cur.second;
        removed++;

        int drs[4] = {-1,1,0,0};
        int dcs[4] = {0,0,-1,1};

        for(int i=0;i<4;i++){
            int nr = r + drs[i];
            int nc = c + dcs[i];
            if(valid(nr,nc) && grid[nr][nc] == ch){
                grid[nr][nc] = '.';
                st.push({nr,nc});
            }
        }
    }
    return removed;
}

void drop_and_score(){
    if(remainingCells == 0) return;

    vector<vector<int>> seen(R, vector<int>(C, 0));
    queue<pair<int,int>> q;

    for(int c=0;c<C;c++){
        if(grid[0][c] != '.'){
            seen[0][c] = 1;
            q.push({0,c});
        }
    }

    while(!q.empty()){
        auto cur = q.front();
        q.pop();
        int r = cur.first, c = cur.second;
        char ch = grid[r][c];

        // vertical down
        if(r+1 < R && grid[r+1][c] != '.' && !seen[r+1][c]){
            seen[r+1][c] = 1;
            q.push({r+1,c});
        }

        // equal-color horizontal links
        if(c-1 >= 0 && grid[r][c-1] == ch && !seen[r][c-1]){
            seen[r][c-1] = 1;
            q.push({r,c-1});
        }
        if(c+1 < C && grid[r][c+1] == ch && !seen[r][c+1]){
            seen[r][c+1] = 1;
            q.push({r,c+1});
        }
    }

    for(int r=0;r<R;r++){
        for(int c=0;c<C;c++){
            if(grid[r][c] != '.' && !seen[r][c]){
                char ch = grid[r][c];
                if(pts.count(ch)) score += pts[ch];
                grid[r][c] = '.';
                remainingCells--;
            }
        }
    }
}

int main(){
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    cin >> R >> C;
    cin >> M;

    grid.assign(R, string(C,'.'));
    remainingCells = 0;

    for(int i=0;i<M;i++){
        for(int j=0;j<C;j++){
            string tok;
            cin >> tok;
            char ch = tok[0];
            grid[i][j] = ch;
            if(ch != '.') remainingCells++;
        }
    }

    vector<char> colors;
    {
        string line;
        getline(cin, line);
        getline(cin, line);
        stringstream ss(line);
        string t;
        while(ss >> t){
            colors.push_back(t[0]);
        }
    }

    vector<int> vals;
    {
        string line;
        getline(cin, line);
        stringstream ss(line);
        int x;
        while(ss >> x) vals.push_back(x);
    }

    for(int i=0;i<(int)colors.size() && i<(int)vals.size();i++){
        pts[colors[i]] = vals[i];
    }

    cin >> N >> K;

    int cr = R;
    int cc = N;
    int dr = -1, dc = 0;

    if(cc < 0) cc = 0;
    if(cc >= C) cc = C-1;

    int maxIter = R * C * 10; // Prevent infinite loops
    int iter = 0;

    while(burstCount < K && remainingCells > 0 && iter < maxIter){
        iter++;

        int nr = cr + dr;
        int nc = cc + dc;

        if(nc < 0 || nc >= C){
            dc = -dc;
            nc = cc + dc;
        }
        if(nr < 0){
            dr = -dr;
            nr = cr + dr;
        }
        if(nr >= R){
            dr = -dr;
            nr = cr + dr;
        }

        int pr = cr, pc = cc;
        cr = nr;
        cc = nc;

        int vr = pr + dr, vc = pc;
        int hr = pr, hc = pc + dc;
        int drc = pr + dr, dcc = pc + dc;

        bool vHit = valid(vr,vc) && grid[vr][vc] != '.';
        bool hHit = valid(hr,hc) && grid[hr][hc] != '.';
        bool dHit = valid(drc,dcc) && grid[drc][dcc] != '.';

        bool hit = false;

        if(vHit && hHit){
            char c1 = grid[vr][vc];
            char c2 = grid[hr][hc];
            remainingCells -= burst_iter(vr,vc,c1);
            if(valid(hr,hc) && grid[hr][hc] == c2)
                remainingCells -= burst_iter(hr,hc,c2);
            dr = -dr; dc = -dc;
            cr = pr; cc = pc;
            hit = true;
        }
        else if(vHit){
            char c1 = grid[vr][vc];
            remainingCells -= burst_iter(vr,vc,c1);
            dr = -dr;
            cr = pr; cc = pc;
            hit = true;
        }
        else if(hHit){
            char c1 = grid[hr][hc];
            remainingCells -= burst_iter(hr,hc,c1);
            dc = -dc;
            cr = pr; cc = pc;
            hit = true;
        }
        else if(dHit){
            char c1 = grid[drc][dcc];
            remainingCells -= burst_iter(drc,dcc,c1);
            dr = -dr; dc = -dc;
            cr = pr; cc = pc;
            hit = true;
        }

        if(hit){
            burstCount++;
            drop_and_score();
            iter = 0; // Reset iteration counter after a hit
        }
    }

    cout << score << endl;
    return 0;
}
