import React, { useState, useEffect } from 'react';
import { Card, Skeleton, DatePicker, Button, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard: React.FC = () => {
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingRevenue, setLoadingRevenue] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [dateRange, setDateRange] = useState<any>([]);
  const { RangePicker } = DatePicker;
  const [combinedData, setCombinedData] = useState<any>([]);

  useEffect(() => {
    // Simulated data containing both revenue and orders information
    const simulatedData = [
      { date: dayjs('2023-12-01').format('YYYY-MM-DD'), revenue: 1000, orders: 5 },
      { date: dayjs('2023-12-02').format('YYYY-MM-DD'), revenue: 1500, orders: 8 },
      { date: dayjs('2023-12-03').format('YYYY-MM-DD'), revenue: 2000, orders: 10 },
      { date: dayjs('2023-12-04').format('YYYY-MM-DD'), revenue: 1200, orders: 6 },
      { date: dayjs('2023-12-05').format('YYYY-MM-DD'), revenue: 1800, orders: 9 },
      { date: dayjs('2023-12-06').format('YYYY-MM-DD'), revenue: 2500, orders: 12 },
      { date: dayjs('2023-12-07').format('YYYY-MM-DD'), revenue: 3000, orders: 15 }
      // Add more data points as needed
    ];

    // Set data for combined chart
    setCombinedData(
      simulatedData.map(item => ({
        date: item.date,
        revenue: item.revenue,
        orders: item.orders
      }))
    );
  }, []);
  // Simulate data loading (you can replace this with actual data fetching logic)
  useEffect(() => {
    setTimeout(() => {
      setLoadingProducts(false);
    }, 2000);

    setTimeout(() => {
      setLoadingUsers(false);
    }, 1500);

    setTimeout(() => {
      setLoadingRevenue(false);
    }, 1800);

    setTimeout(() => {
      setLoadingOrders(false);
    }, 2200);
  }, []);

  // Handle date range change
  const handleDateRangeChange = (dates: any) => {
    // Convert Date objects to Dayjs
    setDateRange(dates.map((date: Date) => dayjs(date)));
  };

  // Handle "Tuần này", "Tháng này", "Năm nay" button click
  const handleQuickDateRange = (type: string) => {
    const today = dayjs();
    let start, end;

    if (type === 'thisWeek') {
      start = today.startOf('week');
      end = today.endOf('week');
    } else if (type === 'thisMonth') {
      start = today.startOf('month');
      end = today.endOf('month');
    } else if (type === 'thisYear') {
      start = today.startOf('year');
      end = today.endOf('year');
    }

    // Set the date range
    setDateRange([start, end]);
  };

  // Render footer with custom buttons
  const renderExtraFooter = () => (
    <div>
      <Button onClick={() => handleQuickDateRange('thisWeek')}>Tuần này</Button>
      <Button onClick={() => handleQuickDateRange('thisMonth')}>Tháng này</Button>
      <Button onClick={() => handleQuickDateRange('thisYear')}>Năm nay</Button>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between space-x-4 px-4 py-8">
        {' '}
        <div className="w-1/4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Tổng sản phẩm</h2>
            <div className={` ${loadingProducts ? 'animate-pulse' : ''}`}>
              {loadingProducts ? <div className="h-4 bg-gray-300 rounded mb-2"></div> : <p>Số lượng: 1000</p>}
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Tổng người dùng</h2>
            <div className={` ${loadingUsers ? 'animate-pulse' : ''}`}>
              {loadingUsers ? <div className="h-4 bg-gray-300 rounded mb-2"></div> : <p>Số lượng: 5000</p>}
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Tổng doanh thu</h2>
            <div className={` ${loadingRevenue ? 'animate-pulse' : ''}`}>
              {loadingRevenue ? <div className="h-4 bg-gray-300 rounded mb-2"></div> : <p>Doanh thu: $100,000</p>}
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Tổng đơn hàng</h2>
            <div className={` ${loadingOrders ? 'animate-pulse' : ''}`}>
              {loadingOrders ? <div className="h-4 bg-gray-300 rounded mb-2"></div> : <p>Số lượng: 50</p>}
            </div>
          </div>
        </div>
      </div>
      <Space direction="vertical" size={12} className="mb-4 px-4">
        <RangePicker
          value={dateRange}
          onChange={handleDateRangeChange}
          renderExtraFooter={renderExtraFooter}
          // ranges={{
          //   'Tuần này': [dayjs(), dayjs()],
          //   'Tháng này': [dayjs(), dayjs()],
          //   'Năm nay': [dayjs(), dayjs()]
          // }}
        />
      </Space>

      <div className="p-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">Biểu đồ Doanh thu và Số đơn hàng</h2>
          <LineChart width={400} height={300} margin={{ top: 5, right: 20, left: 10, bottom: 5 }} data={combinedData}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#f5f5f5" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" name="Doanh thu" stroke="#8884d8" />
            <Line type="monotone" dataKey="value" name="Số đơn hàng" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
