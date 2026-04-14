// import React, { useState } from "react";
// import {
//   DndContext,
//   closestCorners
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   useSortable,
//   verticalListSortingStrategy,
//   arrayMove
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import Layout from "../../components/Layout";
// import "./Pipline.css";

// function Pipeline() {
//   const [data, setData] = useState({
//     todo: {
//       id: "todo",
//       title: "To Do",
//       tasks: [
//         {
//           id: "1",
//           title: "Contact enterprise leads from web forms",
//           tag: "WEB",
//           code: "LEAD-344",
//           avatar: "AJ",
//         },
//         {
//           id: "2",
//           title: "Qualify marketing leads for April campaign",
//           tag: "MARKETING",
//           code: "LEAD-360",
//           avatar: "SK",
//         },
//         {
//           id: "5",
//           title: "Verify phone numbers and profile completeness",
//           tag: "DATA",
//           code: "LEAD-377",
//           avatar: "RM",
//         },
//       ]
//     },
//     inprogress: {
//       id: "inprogress",
//       title: "In Progress",
//       tasks: [
//         {
//           id: "3",
//           title: "Follow up with priority SaaS opportunities",
//           tag: "HOT",
//           code: "LEAD-382",
//           avatar: "DT",
//         },
//         {
//           id: "6",
//           title: "Schedule discovery calls with inbound prospects",
//           tag: "CALLS",
//           code: "LEAD-395",
//           avatar: "AN",
//         },
//       ]
//     },
//     inreview: {
//       id: "inreview",
//       title: "In Review",
//       tasks: [
//         {
//           id: "7",
//           title: "Review lead scoring and assign ownership",
//           tag: "ACCOUNTS",
//           code: "LEAD-401",
//           avatar: "PJ",
//         },
//         {
//           id: "8",
//           title: "Validate proposal follow-up sequence",
//           tag: "SALES",
//           code: "LEAD-405",
//           avatar: "MG",
//         },
//       ],
//     },
//     done: {
//       id: "done",
//       title: "Done",
//       tasks: [
//         {
//           id: "4",
//           title: "Closed deal after final demo discussion",
//           tag: "WON",
//           code: "LEAD-340",
//           avatar: "AK",
//         }
//       ]
//     }
//   });

//   const findColumnByTask = (taskId) =>
//     Object.values(data).find((col) =>
//       col.tasks.some((task) => task.id === taskId)
//     );

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (!over) return;

//     const activeId = active.id;
//     const overId = over.id;

//     const activeColumn = findColumnByTask(activeId);
//     const overColumn = data[overId] || findColumnByTask(overId);

//     if (!activeColumn || !overColumn) return;

//     if (activeColumn.id === overColumn.id) {
//       const oldIndex = activeColumn.tasks.findIndex((t) => t.id === activeId);
//       const overTaskIndex = activeColumn.tasks.findIndex((t) => t.id === overId);
//       const newIndex = overTaskIndex === -1 ? activeColumn.tasks.length - 1 : overTaskIndex;
//       if (oldIndex === -1 || newIndex === -1) return;

//       const newTasks = arrayMove(activeColumn.tasks, oldIndex, newIndex);

//       setData((prev) => ({
//         ...prev,
//         [activeColumn.id]: {
//           ...activeColumn,
//           tasks: newTasks
//         }
//       }));
//     } else {
//       const activeTask = activeColumn.tasks.find((t) => t.id === activeId);
//       if (!activeTask) return;

//       const newActiveTasks = activeColumn.tasks.filter((t) => t.id !== activeId);
//       const overTaskIndex = overColumn.tasks.findIndex((t) => t.id === overId);
//       const insertAt = overTaskIndex === -1 ? overColumn.tasks.length : overTaskIndex;

//       const newOverTasks = [...overColumn.tasks];
//       newOverTasks.splice(insertAt, 0, activeTask);

//       setData((prev) => ({
//         ...prev,
//         [activeColumn.id]: {
//           ...activeColumn,
//           tasks: newActiveTasks
//         },
//         [overColumn.id]: {
//           ...overColumn,
//           tasks: newOverTasks
//         }
//       }));
//     }
//   };

//   const Task = ({ task }) => {
//     const {
//       attributes,
//       listeners,
//       setNodeRef,
//       transform,
//       transition
//     } = useSortable({ id: task.id });

//     const style = {
//       transform: CSS.Transform.toString(transform),
//       transition
//     };

//     return (
//       <div ref={setNodeRef} style={style} className="pipeline-card1" {...attributes} {...listeners}>
//         <p className="pipeline-card-title">{task.title}</p>
//         <div className="pipeline-card-tag">{task.tag}</div>
//         <div className="pipeline-card-footer">
//           <span className="pipeline-card-code">{task.code}</span>
//           <span className="pipeline-card-avatar">{task.avatar}</span>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <Layout>
//       <div className="pipeline-page">
//         <div className="pipeline-topbar">
//           <div className="pipeline-breadcrumb">Projects / Leads</div>
//           <h2>Pipeline</h2>
//         </div>

//         <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
//           <div className="pipeline-board">
//             {Object.values(data).map((column) => (
//               <SortableContext
//                 key={column.id}
//                 items={column.tasks.map((task) => task.id)}
//                 strategy={verticalListSortingStrategy}
//               >
//                 <div className="pipeline-column">
//                   <div className="pipeline-column-header">
//                     <h3>{column.title}</h3>
//                     <span>{column.tasks.length}</span>
//                   </div>

//                   <div className="pipeline-column-body" id={column.id}>
//                     {column.tasks.map((task) => (
//                       <Task key={task.id} task={task} />
//                     ))}
//                   </div>
//                 </div>
//               </SortableContext>
//             ))}
//           </div>
//         </DndContext>
//       </div>

//     </Layout>
//   );
// }

// export default Pipeline;


import React, { useState } from "react";
import {
  DndContext,
  closestCorners,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  PointerSensor
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
    todo: {
      id: "todo",
      title: "To Do",
      tasks: [
        {
          id: "1",
          title: "Contact enterprise leads from web forms",
          tag: "WEB",
          code: "LEAD-344",
          avatar: "AJ",
        },
        {
          id: "2",
          title: "Qualify marketing leads for April campaign",
          tag: "MARKETING",
          code: "LEAD-360",
          avatar: "SK",
        },
        {
          id: "5",
          title: "Verify phone numbers and profile completeness",
          tag: "DATA",
          code: "LEAD-377",
          avatar: "RM",
        },
      ]
    },
    inprogress: {
      id: "inprogress",
      title: "In Progress",
      tasks: [
        {
          id: "3",
          title: "Follow up with priority SaaS opportunities",
          tag: "HOT",
          code: "LEAD-382",
          avatar: "DT",
        },
        {
          id: "6",
          title: "Schedule discovery calls with inbound prospects",
          tag: "CALLS",
          code: "LEAD-395",
          avatar: "AN",
        },
      ]
    },
    inreview: {
      id: "inreview",
      title: "In Review",
      tasks: [
        {
          id: "7",
          title: "Review lead scoring and assign ownership",
          tag: "ACCOUNTS",
          code: "LEAD-401",
          avatar: "PJ",
        },
        {
          id: "8",
          title: "Validate proposal follow-up sequence",
          tag: "SALES",
          code: "LEAD-405",
          avatar: "MG",
        },
      ],
    },
    done: {
      id: "done",
      title: "Done",
      tasks: [
        {
          id: "4",
          title: "Closed deal after final demo discussion",
          tag: "WON",
          code: "LEAD-340",
          avatar: "AK",
        }
      ]
    }
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

      const overTaskIndex = overColumn.tasks.findIndex((t) => t.id === overId);
      const insertAt =
        overTaskIndex === -1
          ? overColumn.tasks.length
          : overTaskIndex;

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
      transition
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
        <p className="pipeline-card-title">{task.title}</p>
        <div className="pipeline-card-tag">{task.tag}</div>
        <div className="pipeline-card-footer">
          <span className="pipeline-card-code">{task.code}</span>
          <span className="pipeline-card-avatar">{task.avatar}</span>
        </div>
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

                  <div className="pipeline-column-body" id={column.id}>
                    {column.tasks.map((task) => (
                      <Task key={task.id} task={task} />
                    ))}
                  </div>
                </div>
              </SortableContext>
            ))}
          </div>

          {/* 🔥 Smooth Floating Card */}
          <DragOverlay>
            {activeTask ? (
              <div className="pipeline-card1 drag-overlay">
                <p className="pipeline-card-title">{activeTask.title}</p>
                <div className="pipeline-card-tag">{activeTask.tag}</div>
                <div className="pipeline-card-footer">
                  <span>{activeTask.code}</span>
                  <span>{activeTask.avatar}</span>
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
