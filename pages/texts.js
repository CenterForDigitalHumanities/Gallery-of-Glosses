import { useState } from 'react';
import Layout from '../components/layout';
import TextList from '../components/text-list';
import PageDetail from '../components/page-detail';
import CompareGlosses from '@/components/compare-glosses';
import GlossMap from '@/components/gloss-map';

const Texts = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentView, setCurrentView] = useState('TextList')
  const [pageData, setPageData] = useState({
    dataUrl: 'https://store.rerum.io/v1/id/610c54deffce846a83e70625', 
    title: 'Named Glosses'
  });
  
  const UserTools = [
    { 
      name: 'Browse Named Glosses', 
      dataUrl: 'https://store.rerum.io/v1/id/610c54deffce846a83e70625', 
      title: "Named Glosses" 
    },
    { 
      name: 'Browse Manuscripts', 
      dataUrl: 'https://store.rerum.io/v1/id/610ad6f1ffce846a83e70613', 
      title: "Manuscripts" 
    },
    {
      name: 'Browse Canonical Texts (not working)',
      dataUrl: '', 
      title: "X" 

    },
    {
      name: 'Compare Glosses (non functional)',
      dataUrl: 'https://store.rerum.io/v1/id/610c54deffce846a83e70625', 
      title: "Compare Glosses" 
    },
    {
      name: 'Gloss Map (non functional)',
      dataUrl: 'https://store.rerum.io/v1/id/610c54deffce846a83e70625', 
      title: "Gloss Map" 
    },
    {
      name: 'Add Manifest Expression (not working)',
      dataUrl: '', 
      title: "X" 
    },
    {
      name: 'Register a Canonical Text (not working)',
      dataUrl: '',
      title: "X" 
    }
  ];

  const updateData = (tool) => {
    setPageData({
      dataUrl: tool.dataUrl,
      title: tool.title
    });
    setSelectedItem(null);
    switch(tool.title) { 
      case 'Compare Glosses':
        setCurrentView('CompareGlosses');
        break;
      case 'Gloss Map':
        setCurrentView('GlossMap');
        break;
      default:
        setCurrentView('TextList');
    }
  }

  const handleItemClick = (id, label) => {
    setSelectedItem({ id, label, pageData });
    setCurrentView('PageDetail');
  }

  return (
    <Layout>
      <div className="flex flex-row">
        <div className="w-1/5 overflow-hidden">
          <div>
          <p className="text-2xl pb-2">
            User Tools
          </p>
          <div className="flex flex-col gap-2">
              {UserTools.map((tool, index) => (
                  <p className="text-blue-500 cursor-pointer" key={index} onClick={() => updateData(tool)}>{tool.name}</p>
              ))}
          </div>
        </div>
        </div>
        <div className="w-4/5">
          {currentView === 'PageDetail' && selectedItem && <PageDetail item={selectedItem} onBack={() => {setSelectedItem(null); setCurrentView('TextList');}} />}
          {currentView === 'TextList' && <TextList dataUrl={pageData.dataUrl} title={pageData.title} onItemClicked={handleItemClick}/>}
          {currentView === 'CompareGlosses' && <CompareGlosses />}
          {currentView === 'GlossMap' && <GlossMap />}
        </div>  
      </div>
    </Layout>
  );
};

export default Texts;
