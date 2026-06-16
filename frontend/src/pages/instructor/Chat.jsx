import DashboardLayout from "../../components/DashboardLayout";
import { MessageSquare } from "lucide-react";

function Chat() {
  return (
    <DashboardLayout role="student">
      <div className="dashboard">
        <h1 style={{ color: "#04AA6D" }}>
          <MessageSquare size={30} /> AI Learning Assistant
        </h1>

        <div className="course-card">
          <h3>Coming Soon </h3>

          <p>
            This page will allow students to ask questions,
            clarify doubts, and get learning assistance while
            studying courses.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Chat;