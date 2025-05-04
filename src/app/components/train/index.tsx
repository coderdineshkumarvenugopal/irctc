import React from 'react';
import { Tabs, Typography } from 'antd';
import type { TabsProps } from 'antd';
import engine from "/images/coach/engine.svg";
import carrage from "/images/coach/carrage.svg";
import SVG from 'react-inlinesvg'

const Train: React.FC = () => {
    const {Text}=Typography;
const items: TabsProps['items'] = [
  {
    key: '1',
    label:  <div className='flex flex-col gap-2'><SVG className="h-10 w-20" src={engine}/><Text className='flex justify-center items-center'>Engine</Text></div>,
    children: '',
    disabled: true,
  },
  {
    key: '2',
    label: <div className='flex flex-col gap-2'><SVG className="h-10 w-20" src={carrage}/><Text className='flex justify-center items-center'>C1</Text></div>,
    children: '',
  },
  {
    key: '3',
    label: <div className='flex flex-col gap-2'><SVG className="h-10 w-20" src={carrage}/><Text className='flex justify-center items-center'>C2</Text></div>,
    children: '',
  },
  {
    key: '4',
    label: <div className='flex flex-col gap-2'><SVG className="h-10 w-20" src={carrage}/><Text className='flex justify-center items-center'>C3</Text></div>,
    children: '',
  },
  {
    key: '5',
    label: <div className='flex flex-col gap-2'><SVG className="h-10 w-20" src={carrage}/><Text className='flex justify-center items-center'>S1</Text></div>,
    children: '',
  },
  {
    key: '6',
    label: <div className='flex flex-col gap-2'><SVG className="h-10 w-20" src={carrage}/><Text className='flex justify-center items-center'>S2</Text></div>,
    children: '',
  },
  {
    key: '7',
    label: <div className='flex flex-col gap-2'><SVG className="h-10 w-20" src={carrage}/><Text className='flex justify-center items-center'>S3</Text></div>,
    children: '',
  },
];
return <Tabs items={items} />};

export default Train;