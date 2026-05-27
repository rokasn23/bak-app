export default function Header({
  onOpenModal,
  currentWorkspace,
  workspaces,
  onWorkspaceChange,
}) {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Fizikos reiškinių 3D modeliai</h1>
      </div>

      <div className="header-right">
        <select className="header-dropdown-select"
          value={currentWorkspace}
          onChange={(e) => onWorkspaceChange(e.target.value)}
        >
          {workspaces.map((workspace) => (
            <option key={workspace.id} value={workspace.id}>
              {workspace.name}
            </option>
          ))}
        </select>

        <button onClick={onOpenModal}>
          Apie svetainę
        </button>
      </div>
    </header>
  );
}