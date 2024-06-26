import { Row } from 'antd';
import { ReactNode } from 'react';

interface PageTitleProps {
  title: string;
  filter?: ReactNode;
  rightNode?: ReactNode | undefined;
}

export const PageTitle = ({ rightNode, title }: PageTitleProps) => {
  return (
    <Row className='flex justify-between items-center h-[80px] m-0 bg-white rounded-md px-5 md:px-8'>
      <p className='text-left font-medium text-[32px] mb-0'>{title}</p>
      {rightNode}
    </Row>
  );
};
