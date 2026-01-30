import TaskItem from "./TaskItem";

export default function TaskList({
    tasks,
    onToggle,
    onDelete,
    onUpdate,
}: any) {
    return (
        <div className="space-y-2" >
            {
                tasks.map((task: any) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                ))
            }
        </div>
    );
}
