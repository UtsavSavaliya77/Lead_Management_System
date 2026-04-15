import React, { useState } from "react";
import {
  DndContext,
  closestCorners,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  PointerSensor,
  useDroppable
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Layout from "../../components/Layout";
import "./Pipline.css";

function Pipeline() {
  const [data, setData] = useState({
    new: {
      id: "new",
      title: "New",
      tasks: [
        {
          id: "1",
          leadName: "John Doe",
          company: "ABC Ltd",
          priority: "High",
          assignee: "Alex Johnson",
          followUp: "2026-04-16",
          source: "Web",
        },
        {
          id: "2",
          leadName: "Jane Smith",
          company: "XYZ Pvt",
          priority: "Medium",
          assignee: "Sarah Khan",
          followUp: "2026-04-18",
          source: "LinkedIn",
        },
      ]
    },
    contacted: {
      id: "contacted",
      title: "Contacted",
      tasks: [
        {
          id: "3",
          leadName: "Priya Iyer",
          company: "Cloudnova",
          priority: "High",
          assignee: "David Thomas",
          followUp: "2026-04-15",
          source: "Ads",
        },
        {
          id: "6",
          leadName: "Aman Verma",
          company: "GrowthHive",
          priority: "Medium",
          assignee: "Anita Nair",
          followUp: "2026-04-17",
          source: "Website",
        },
      ]
    },
    qualified: {
      id: "qualified",
      title: "Qualified",
      tasks: [
        {
          id: "7",
          leadName: "Neha Patil",
          company: "Acme Corp",
          priority: "High",
          assignee: "Piyush Jain",
          followUp: "2026-04-19",
          source: "LinkedIn",
        },
        {
          id: "8",
          leadName: "Mohit Gupta",
          company: "FinEdge",
          priority: "Low",
          assignee: "Maya George",
          followUp: "2026-04-22",
          source: "Referral",
        },
      ],
    },
    proposalSent: {
      id: "proposalSent",
      title: "Proposal Sent",
      tasks: [
        {
          id: "5",
          leadName: "Rahul Mehta",
          company: "TechSoft",
          priority: "Low",
          assignee: "Ravi Menon",
          followUp: "2026-04-21",
          source: "Referral",
        },
      ],
    },
    negotiation: {
      id: "negotiation",
      title: "Negotiation",
      tasks: [
        {
          id: "9",
          leadName: "Karan Malhotra",
          company: "Zenith Labs",
          priority: "High",
          assignee: "Nisha Sharma",
          followUp: "2026-04-20",
          source: "Website",
        },
      ],
    },
    won: {
      id: "won",
      title: "Won",
      tasks: [
        {
          id: "4",
          leadName: "Arjun Kapoor",
          company: "BluePeak",
          priority: "High",
          assignee: "Ankit Kumar",
          followUp: "2026-04-14",
          source: "Web",
        }
      ]
    },
    lost: {
      id: "lost",
      title: "Lost",
      tasks: [
        {
          id: "10",
          leadName: "Isha Roy",
          company: "PrimeSquare",
          priority: "Medium",
          assignee: "Vikram Das",
          followUp: "2026-04-09",
          source: "Referral",
        },
      ],
    },
  });

  const [activeTask, setActiveTask] = useState(null);

  // 🔥 Sensors (smooth drag control)
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 6
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 120,
        tolerance: 8
      }
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  );

  // 🔍 Find column
  const findColumnByTask = (taskId) =>
    Object.values(data).find((col) =>
      col.tasks.some((task) => task.id === taskId)
    );

  // 🟢 Drag Start
  const handleDragStart = (event) => {
    const { active } = event;

    const task = Object.values(data)
      .flatMap(col => col.tasks)
      .find(t => t.id === active.id);

    setActiveTask(task);
  };

  // 🔄 Drag End (your logic reused)
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeColumn = findColumnByTask(activeId);
    const overColumn = data[overId] || findColumnByTask(overId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn.id === overColumn.id) {
      const oldIndex = activeColumn.tasks.findIndex((t) => t.id === activeId);
      const overTaskIndex = activeColumn.tasks.findIndex((t) => t.id === overId);
      const newIndex =
        overTaskIndex === -1
          ? activeColumn.tasks.length - 1
          : overTaskIndex;

      const newTasks = arrayMove(activeColumn.tasks, oldIndex, newIndex);

      setData((prev) => ({
        ...prev,
        [activeColumn.id]: {
          ...activeColumn,
          tasks: newTasks
        }
      }));
    } else {
      const activeTask = activeColumn.tasks.find((t) => t.id === activeId);
      if (!activeTask) return;

      const newActiveTasks = activeColumn.tasks.filter((t) => t.id !== activeId);

      const isDroppingOnColumn = data[overId];

      const insertAt = isDroppingOnColumn
        ? overColumn.tasks.length   // dropped on column → last
        : overColumn.tasks.length;  // dropped on task → ALSO last


      const newOverTasks = [...overColumn.tasks];
      newOverTasks.splice(insertAt, 0, activeTask);

      setData((prev) => ({
        ...prev,
        [activeColumn.id]: {
          ...activeColumn,
          tasks: newActiveTasks
        },
        [overColumn.id]: {
          ...overColumn,
          tasks: newOverTasks
        }
      }));
    }
  };

  // 🔵 Wrapper to clear overlay
  const handleDragEndWrapper = (event) => {
    handleDragEnd(event);
    setActiveTask(null);
  };

  // 🧱 Task UI
  const Task = ({ task }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
    } = useSortable({ id: task.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition: "transform 200ms ease"
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className="pipeline-card1"
        {...attributes}
        {...listeners}
      >
        <p className="pipeline-card-title">{task.leadName}</p>
        <p className="pipeline-card-company">{task.company}</p>
        <div className="pipeline-card-grid">
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Assignee:</strong> {task.assignee}</p>
          <p><strong>Next Follow-up:</strong> {task.followUp}</p>
          <p><strong>Source:</strong> {task.source}</p>
        </div>
      </div>
    );
  };

  // 🧱 Column drop area (supports dropping into empty columns)
  const ColumnBody = ({ column }) => {
    const { setNodeRef, isOver } = useDroppable({
      id: column.id,
    });

    return (
      <div
        ref={setNodeRef}
        className="pipeline-column-body"
        id={column.id}
        style={{ backgroundColor: isOver ? "#e2e8f0" : "transparent" }}
      >
        {column.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="pipeline-page">
        <div className="pipeline-topbar">
          <div className="pipeline-breadcrumb">Projects / Leads</div>
          <h2>Pipeline</h2>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEndWrapper}
          onDragCancel={() => setActiveTask(null)}
        >
          <div className="pipeline-board">
            {Object.values(data).map((column) => (
              <SortableContext
                key={column.id}
                items={column.tasks.map((task) => task.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="pipeline-column">
                  <div className="pipeline-column-header">
                    <h3>{column.title}</h3>
                    <span>{column.tasks.length}</span>
                  </div>

                  <ColumnBody column={column} />
                </div>
              </SortableContext>
            ))}
          </div>

          {/* 🔥 Smooth Floating Card */}
          <DragOverlay>
            {activeTask ? (
              <div className="pipeline-card1 drag-overlay">
                <p className="pipeline-card-title">{activeTask.leadName}</p>
                <p className="pipeline-card-company">{activeTask.company}</p>
                <div className="pipeline-card-grid">
                  <p><strong>Priority:</strong> {activeTask.priority}</p>
                  <p><strong>Assignee:</strong> {activeTask.assignee}</p>
                  <p><strong>Next Follow-up:</strong> {activeTask.followUp}</p>
                  <p><strong>Source:</strong> {activeTask.source}</p>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </Layout>
  );
}

export default Pipeline;
