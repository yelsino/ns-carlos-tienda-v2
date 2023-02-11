// "2023-02-11T18:48:55.234Z"
// "Lunes 24 de noviembre 2022"
export const formatDate = (date: Date) => {
	const dateObj = new Date(date);
	const options:any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	return dateObj.toLocaleDateString('es-ES', options);
}