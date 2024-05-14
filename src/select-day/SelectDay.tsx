import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Control, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { TaskForm } from "../task-repost/task-form.model";
import { useEffect, useState } from "react";

// const events = [
//     { title: 'event 1', date: '2024-05-01' },
//     { title: 'event 2', date: '2024-05-12' }
// ]

export function SelectDay({ control, setValue, getValues }: {
    control: Control<TaskForm>, setValue: UseFormSetValue<TaskForm>,
    getValues: UseFormGetValues<TaskForm>
}) {
    const [day, setDay] = useState<string | null>(null);

    useEffect(() => {
        const dateValue = getValues('day');
        setDay(dateValue);
    }, []);

    function renderEventContent(eventInfo: any) {
        return (
            <>
                <i>{eventInfo.event.title}</i>
            </>
        )
    }
    return (
        <FullCalendar
            editable={true}
            selectable={true}
            selectMirror={true}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            weekends={true}
            select={(dateInfo) => {
                setDay(dateInfo.start.toISOString());
                // setValue('day', dateInfo.start.toISOString());
            }}
            // initialDate={day ? new Date(day) : undefined}
            initialDate='2024-05-15'
            
            eventContent={renderEventContent}
        />
    )
}

