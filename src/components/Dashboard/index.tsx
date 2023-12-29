import React, { useState, useEffect } from 'react';
import { Card, Skeleton, DatePicker, Button, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ContainerOutlined, DropboxOutlined, MoneyCollectOutlined, TeamOutlined } from '@ant-design/icons';
import useAnalytic from './hook/useAnalytic';
import { formatCurrency } from '@/utils/format-currency';

const Dashboard: React.FC = () => {
  const { RangePicker } = DatePicker;
  const today = dayjs();
  const [dateRange, setDateRange] = useState<any>([today.startOf('day'), today.endOf('day')]);
  const [combinedData, setCombinedData] = useState<any>([]);
  const { result, isLoading } = useAnalytic({
    startTime: dateRange[0],
    endTime: dateRange[1]
  });

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

  // Handle date range change
  const handleDateRangeChange = (dates: any) => {
    // Convert Date objects to Dayjs
    setDateRange(dates.map((date: Date) => dayjs(date)));
  };

  // Handle "Tuần này", "Tháng này", "Năm nay" button click
  const handleQuickDateRange = (type: string) => {
    const today = dayjs();
    let start, end;
    if (type == 'today') {
      start = today.startOf('day');
      end = today.endOf('day');
    } else if (type === 'thisWeek') {
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
    <div className="my-2 flex justify-around">
      <Button className=" font-bold text-md" onClick={() => handleQuickDateRange('today')}>
        Hôm Nay
      </Button>
      <Button className=" font-bold text-md" onClick={() => handleQuickDateRange('thisWeek')}>
        Tuần này
      </Button>
      <Button className=" font-bold text-md" onClick={() => handleQuickDateRange('thisMonth')}>
        Tháng này
      </Button>
      <Button className=" font-bold text-md" onClick={() => handleQuickDateRange('thisYear')}>
        Năm nay
      </Button>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between space-x-4 px-4 py-8">
        {' '}
        <div className="w-1/4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-md justify-center mb-4 flex items-center">
              <DropboxOutlined className="text-pink-500 mr-2 text-3xl" />
              Sản phẩm
            </h2>
            <div className={` ${isLoading ? 'animate-pulse' : ''}`}>
              {isLoading ? (
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
              ) : (
                <p className="font-bold text-pink-500 text-2xl text-center">{result?.product || 0}</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-md justify-center mb-4 flex items-center">
              <TeamOutlined className="text-pink-500 mr-2 text-3xl" />
              Người Dùng
            </h2>
            <div className={` ${isLoading ? 'animate-pulse' : ''}`}>
              {isLoading ? (
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
              ) : (
                <p className="font-bold text-pink-500 text-2xl text-center">{result?.user || 0}</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-md justify-center mb-4 flex items-center">
              <MoneyCollectOutlined className="text-pink-500 mr-2 text-3xl" />
              Doanh Thu
            </h2>
            <div className={` ${isLoading ? 'animate-pulse' : ''}`}>
              {isLoading ? (
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
              ) : (
                <p className="font-bold text-pink-500 text-2xl text-center">{formatCurrency(result?.revenue || 0)}</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-md justify-center mb-4 flex items-center">
              <ContainerOutlined className="text-pink-500 mr-2 text-3xl" />
              Đơn Hàng
            </h2>
            <div className={` ${isLoading ? 'animate-pulse' : ''}`}>
              {isLoading ? (
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
              ) : (
                <p className="font-bold text-pink-500 text-2xl text-center">{result?.order || 0}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <Space direction="vertical" size={12} className="mb-4 ">
            <RangePicker
              value={dateRange}
              onChange={handleDateRangeChange}
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              renderExtraFooter={renderExtraFooter}
            />
          </Space>
          <h2 className="text-lg font-semibold mb-4">Biểu đồ Doanh thu và Đơn hàng</h2>
          <LineChart width={1000} height={500} margin={{ top: 5, right: 20, left: 10, bottom: 5 }} data={combinedData}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#f5f5f5" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" name="Doanh thu" stroke="#FF0097" />
            <Line type="monotone" dataKey="order" name="Đơn hàng" stroke="#0F764A" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
