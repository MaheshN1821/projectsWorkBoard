import { useState } from "react";
import { MessageSquare, Send, User, Clock, Plus } from "lucide-react";
import axios from "axios";

const NotesSection = ({ projectId, notes, onNotesUpdate }) => {
  const [newNote, setNewNote] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsAdding(true);
    const clientId = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `https://projects-work-board.vercel.app/api/pwb/projects/${projectId}/notes`,
        { content: newNote.trim() },
        {
          headers: {
            Authorization: `Bearer ${clientId}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update parent component with new notes
      if (onNotesUpdate) {
        onNotesUpdate(response.data.notes);
      }

      setNewNote("");
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-gray-300 shadow-xl mt-10 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Project Notes</h3>
            <p className="text-sm text-gray-600">
              {notes?.length || 0} note{notes?.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            <span>Add Note</span>
          </button>
        )}
      </div>

      {/* Add Note Form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-blue-200">
          <form onSubmit={handleAddNote} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add a new note
              </label>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Enter your note here..."
                disabled={isAdding}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewNote("");
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                disabled={isAdding}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isAdding || !newNote.trim()}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAdding ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isAdding ? "Adding..." : "Add Note"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {notes && notes.length > 0 ? (
          notes.map((note, index) => (
            <div
              key={note._id || index}
              className="p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/50 hover:bg-white/60 transition-all duration-300"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-gray-800">
                      {note.author?.username || "Anonymous"}
                    </h4>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(note.createdAt)}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-500 mb-2">
              No notes yet
            </h4>
            <p className="text-gray-400 text-sm">
              Add the first note to start tracking project updates and
              communications.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesSection;
