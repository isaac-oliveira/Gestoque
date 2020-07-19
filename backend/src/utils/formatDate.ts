const acceptedFields = {
  day: (date: Date) => date.getDate(),
  month: (date: Date) => date.getMonth(),
  year: (date: Date) => date.getFullYear(),
};

export default function formatDate(date: Date, fields: string[]) {
  const formatedDate = fields.map((field) => {
    const getFields = acceptedFields[field];

    if (getFields) return `${getFields(date)}`;
    return '';
  });

  return formatedDate.join('/');
}
