const initState = {
    SaleData :[

        {
            key: '1',
            id_chungtu: '00001x',
            bill_id: '202211',
            description: 'Bán cho công ty X',
            customer: 'Công ty X',
            date_chungtu: '16/06/2022',
            date_hachtoan: '16/06/2022',
            total: '66666',
            status: 1,
        },
        {
            key: '2',
            id_chungtu: '00002x',
            bill_id: '202212',
            description: 'Bán cho công ty X',
            customer: 'Công ty X',
            date_chungtu: '16/06/2022',
            date_hachtoan: '16/06/2022',
            total: '66666',
            status: 2,
        },
        {
            key: '3',
            id_chungtu: '00003x',
            bill_id: '202213',
            description: 'Bán cho công ty X',
            customer: 'Công ty X',
            date_chungtu: '16/06/2022',
            date_hachtoan: '16/06/2022',
            total: '66666',
            status: 2,
        },
        {
            key: '4',
            id_chungtu: '00004x',
            bill_id: '202214',
            description: 'Bán cho công ty X',
            customer: 'Công ty X',
            date_chungtu: '16/06/2022',
            date_hachtoan: '16/06/2022',
            total: '66666',
            status: 3,
        },
        {
            key: '5',
            id_chungtu: '00005x',
            bill_id: '202215',
            description: 'Bán cho công ty X',
            customer: 'Công ty X',
            date_chungtu: '16/06/2022',
            date_hachtoan: '16/06/2022',
            total: '66666',
            status: 2,
        },

    ]


}

export default function saleReducer(state = initState, action) {
    switch (action.type) {
        default:
            return state
    }
}