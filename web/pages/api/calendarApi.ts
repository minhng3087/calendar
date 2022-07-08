import axiosClient from "./axiosClient";

class CalendarApi {
    getAll = () => {
        const url = '/events'
        return axiosClient.get(url)
    };
    getDetailEvent(id: Number) {
        const url = `/events/${id}/`
        return axiosClient.get(url)
    };
    addEvent(data: any) {
        const url = '/events/'
        return axiosClient.post(url, data)
    };
    updateEvent(id: Number, data: any) {
        const url = `/events/${id}`
        return axiosClient.put(url, data)
    };
    removeEvent(id: Number) {
        const url = `/events/${id}`
        return axiosClient.delete(url)
    }
}

const calendarApi = new CalendarApi();
export default calendarApi;