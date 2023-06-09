import { useState } from 'react';
import Layout from '../components/Layout';
import NamedGlosses from '../components/browse-by-tools/NamedGlosses';
import PageDetail from '../components/PageDetail';
import Book from '@/components/browse-by-tools/Book';
import Theme from '@/components/browse-by-tools/Theme';
import Manuscript from '@/components/browse-by-tools/Manuscript';
import Tag from '@/components/browse-by-tools/Tag';

const Texts = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentView, setCurrentView] = useState('Named Glosses')
  const [pageData, setPageData] = useState({
    name: 'Browse by Named Glosses',
    title: 'Named Glosses'
  });
  
  const UserTools = [
    { 
      name: 'Browse by Named Glosses', 
      title: "Named Glosses" 
    },
    { 
        name: 'Browse by Book', 
        title: "Book" 
    },
    {
        name: 'Browse by Theme',
        title: "Theme" 
  
      },
    { 
      name: 'Browse by Manuscript', 
      title: "Manuscript" 
    },
    {
      name: 'Browse by Tag',
      title: "Tag" 
    }
  ];

  const updateData = (tool) => {
    setPageData({
        name: tool.name,
        title: tool.title
    });
    setSelectedItem(null);
    switch(tool.title) { 
        case 'Book':
            setCurrentView('Book');
            break;
        case 'Theme':
            setCurrentView('Theme');
            break;
        case 'Manuscript':
            setCurrentView('Manuscript');
            break;
        case 'Tag':
            setCurrentView('Tag');
            break;
      default:
        setCurrentView('NamedGlosses');
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
          {currentView === 'PageDetail' && selectedItem && <PageDetail item={selectedItem} onBack={() => {setSelectedItem(null); setCurrentView('NamedGlosses');}} />}
          {currentView === 'NamedGlosses' && <NamedGlosses title={pageData.name} onItemClicked={handleItemClick}/>}
          {currentView === 'Book' && <Book title={pageData.name} onItemClicked={handleItemClick}/>}
          {currentView === 'Theme' && <Theme title={pageData.name} onItemClicked={handleItemClick}/>}
          {currentView === 'Manuscript' && <Manuscript title={pageData.name} onItemClicked={handleItemClick}/>}
          {currentView === 'Tag' && <Tag title={pageData.name} onItemClicked={handleItemClick}/>}
        </div>  
      </div>
    </Layout>
  );
};

export default Texts;
