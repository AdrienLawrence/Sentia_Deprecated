import styles from './Editor.module.css'

export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const note = await fetch(`http://localhost:3000/api/notes/${id}`).then(res => res.json())

  return (
    <div className={styles.editorContainer}>
      {/* SIDEBAR */}
      <div className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Format</h3>
        
        {/* Font Family */}
        <div className={styles.sidebarSection}>
          <label className={styles.sidebarLabel}>Font</label>
          <select className={styles.sidebarSelect}>
            <option>Arial</option>
            <option>Times New Roman</option>
            <option>Georgia</option>
          </select>
        </div>

        {/* Font Size */}
        <div className={styles.sidebarSection}>
          <label className={styles.sidebarLabel}>Size</label>
          <select className={styles.sidebarSelect}>
            <option>12</option>
            <option>14</option>
            <option>16</option>
            <option>18</option>
          </select>
        </div>

        {/* List Tools */}
        <div className={styles.sidebarSection}>
            <label className={styles.sidebarLabel}>Lists</label>
            <select className={styles.sidebarSelect}>
              <option>Bulleted List</option>
              <option>Numbered List</option>
            </select>
        </div>

        {/* Insert Tools */}
        <div className={styles.sidebarSection}>
          <label className={styles.sidebarLabel}>Insert</label>
          <button className={styles.sidebarButton}>Columns</button>
          <button className={styles.sidebarButton}>Rows</button>
          <button className={styles.sidebarButton}>Table</button>
          <button className={styles.sidebarButton}>Page Break</button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className={styles.mainContent}>
        <div className={styles.topBar}>
          <div className={styles.documentTitle}>
            {note.title || "Untitled document"}
          </div>
          <button className={styles.shareButton}>
            Share
          </button>
        </div>

        <div className={styles.documentArea}>
          <div className={styles.paper}>
            <input 
              defaultValue={note.title} 
              className={styles.titleInput}
              placeholder="Document title"
            />
            <div 
              className={styles.contentArea}
              contentEditable
              suppressContentEditableWarning
            >
              {note.content || "Start typing..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}