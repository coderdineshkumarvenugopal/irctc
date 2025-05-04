/* eslint-disable @typescript-eslint/no-unused-vars */
import { Layout, Spin } from 'antd';
import { useState } from 'react';

import { fetchPNRStatus } from '../../services/pnrService';
import { PNRData } from '../../types';
import PNRDetails from './PNRDetails';
import PNRSearch from './PNRSearch';
import './pnr.css';

const { Header, Content, Footer } = Layout;

const Pnr=() =>{
  const [pnrData, setPnrData] = useState<PNRData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (pnrNumber: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchPNRStatus(pnrNumber);
      
      if (response.success && response.data) {
        setPnrData(response.data);
      } else {
        setError(response.error || 'Failed to fetch PNR details');
        setPnrData(null);
      }
    } catch (err:any) {
      setError('An unexpected error occurred');
      setPnrData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Layout className="min-h-screen ">
        <Header className="!bg-transparent shadow-sm flex items-center justify-center p-0 h-16">
          <div className="max-w-7xl w-full px-4 flex items-center">
            <h1 className="text-xl font-bold text-blue-600 m-0 flex justify-center items-center">PNR Status Checker</h1>
          </div>
        </Header>
        
        <Content className="p-6 flex flex-col items-center">
          <div className={`transition-all duration-500 ease-in-out ${pnrData ? 'max-w-4xl' : 'max-w-md'} w-full`}>
            {!pnrData && (
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your PNR Status</h2>
                <p className="text-gray-600">
                  Enter your 10-digit PNR number to check the current status
                </p>
              </div>
            )}
            
            {!pnrData && (
              <PNRSearch 
                onSearch={handleSearch} 
                isLoading={loading} 
                error={error} 
              />
            )}
            
            {loading && (
              <div className="flex justify-center my-8">
                <Spin size="large" tip="Fetching PNR details..." />
              </div>
            )}
            
            {pnrData && !loading && (
              <div className="mt-4">
                <PNRDetails pnrData={pnrData} />
                
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => {
                      setPnrData(null);
                      setError(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Check Another PNR
                  </button>
                </div>
              </div>
            )}
          </div>
        </Content>
        
        <Footer className="text-center border-t border-gray-200 flex flex-col gap-2 p-4">

          <p className="text-gray-600 text-sm">
           Made with ❤️ by IRCTC
          </p>
        </Footer>
      </Layout>
      </div>
  );
}

export default Pnr;