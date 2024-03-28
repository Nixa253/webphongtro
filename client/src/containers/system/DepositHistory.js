import React, { useEffect, useState } from 'react';
import { apiGetHistoryUser } from '../../services';
import { useSelector } from 'react-redux';

const DepositHistory = () => {
    const { currentData } = useSelector(state => state.user);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await apiGetHistoryUser(currentData.id);
                const adaptedHistory = adaptHistory(response?.data?.response);
                setHistory(adaptedHistory);
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        fetchHistory();
    }, [currentData.id]);

    const adaptHistory = (historyData) => {
        return historyData.map(historyItem => ({
            transactionId: historyItem.transaction_id,
            createdAt: historyItem.createdAt,
            amount: `${historyItem.amount} VND`,
            status: 'Thành công'
        }));
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Mã giao dịch
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ngày giao dịch
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tổng tiền
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Trạng thái
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((historyItem, index) => (
                        <tr
                            key={index}
                            className={`${
                                index % 2 === 0
                                    ? 'even:bg-gray-50 even:dark:bg-gray-800'
                                    : 'odd:bg-white odd:dark:bg-gray-900'
                            } border-b dark:border-gray-700`}
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {historyItem.transactionId}
                            </th>
                            <td className="px-6 py-4">{historyItem.createdAt}</td>
                            <td className="px-6 py-4">{historyItem.amount}</td>
                            <td className="px-6 py-4">{historyItem.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DepositHistory;