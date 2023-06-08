import { useState } from 'react';
import Layout from '../components/Layout';
import TextList from '../components/TextList';
import PageDetail from '../components/PageDetail';
import Book from '@/components/Book';

const Texts = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentView, setCurrentView] = useState('TextList')
  const [pageData, setPageData] = useState({
    dataUrl: 'https://store.rerum.io/v1/id/610c54deffce846a83e70625', 
    title: 'Meta Glosses'
  });
  
  const UserTools = [
    { 
      name: 'Browse by Meta Glosses', 
      dataUrl: 'https://store.rerum.io/v1/id/610c54deffce846a83e70625', 
      title: "Meta Glosses" 
    },
    { 
        name: 'Browse by Book', 
        dataUrl: '', 
        title: "Books" 
    },
    {
        name: 'Browse by Theme',
        dataUrl: '', 
        title: "Themes" 
  
      },
    { 
      name: 'Browse by Manuscript', 
      dataUrl: 'https://store.rerum.io/v1/id/610ad6f1ffce846a83e70613', 
      title: "Manuscripts" 
    },
    {
      name: 'Browse by Tag',
      dataUrl: '',
      title: "Tags" 
    }
  ];

  const updateData = (tool) => {
    setPageData({
      dataUrl: tool.dataUrl,
      title: tool.title
    });
    setSelectedItem(null);
    switch(tool.title) { 
      case 'Books':
        setCurrentView('Books');
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
        <div className="ml-4 lg:ml-0 w-4/5">
          {currentView === 'PageDetail' && selectedItem && <PageDetail item={selectedItem} onBack={() => {setSelectedItem(null); setCurrentView('TextList');}} />}
          {currentView === 'TextList' && <TextList dataUrl={pageData.dataUrl} title={pageData.title} onItemClicked={handleItemClick}/>}
          {currentView === 'Books' && <Book />}
        </div>  
      </div>
    </Layout>
  );
};

export default Texts;
