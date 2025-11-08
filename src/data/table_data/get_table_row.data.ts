export interface ITableRowData {
    'Last Name': string;
    'First Name': string;
    'Email': string;
    'Due': string;
    'Web Site': string;
}

const expectedTable: ITableRowData[] = [
    {
        'Last Name': 'Smith',
        'First Name': 'John',
        'Email': 'jsmith@gmail.com',
        'Due': '$50.00',
        'Web Site': 'http://www.jsmith.com'
    },
    {
        'Last Name': 'Conway',
        'First Name': 'Tim',
        'Email': 'tconway@earthlink.net',
        'Due': '$50.00',
        'Web Site': 'http://www.timconway.com'
    },
    {
        'Last Name': 'Bach',
        'First Name': 'Frank',
        'Email': 'fbach@yahoo.com',
        'Due': '$51.00',
        'Web Site': 'http://www.frank.com'
    },
    {
        'Last Name': 'Doe',
        'First Name': 'Jason',
        'Email': 'jdoe@hotmail.com',
        'Due': '$100.00',
        'Web Site': 'http://www.jdoe.com'
    }
]

export default expectedTable;
