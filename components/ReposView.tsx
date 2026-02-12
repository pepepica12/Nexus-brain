import React, { useEffect, useState } from "react";
import { api } from "../services/api";

const ReposView: React.FC = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api("/repos").then((data) => setRepos(data.repos));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-4">Repositories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo: any) => (
          <div
            key={repo.id}
            className="bg-slate-900 border border-slate-700 p-4 rounded-lg"
          >
            <h3 className="text-xl font-semibold text-white">{repo.name}</h3>
            <p className="text-slate-400">{repo.full_name}</p>
            <p className="text-slate-500 text-sm mt-2">
              Language: {repo.language}
            </p>
            <p className="text-slate-500 text-sm">
              Updated: {repo.updated_at}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReposView;
