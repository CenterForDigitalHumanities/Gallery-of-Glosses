import { useState } from 'react';
import Layout from '../components/layout';
import TextList from '../components/text-list';

const Texts = () => {
  const [pageData, setPageData] = useState({
    dataUrl: 'https://store.rerum.io/v1/id/610c54deffce846a83e70625', 
    title: 'Named Glosses'
  });

  const UserTools = [
    { 
      name: 'Search Named Glosses', 
      dataUrl: 'https://store.rerum.io/v1/id/610c54deffce846a83e70625', 
      title: "Named Glosses" 
    },
    { 
      name: 'Search Manuscripts', 
      dataUrl: 'https://store.rerum.io/v1/id/610ad6f1ffce846a83e70613', 
      title: "Manuscripts" 
    },
    {
      name: 'Search Canonical Texts (not working)',
      dataUrl: 'https://store.rerum.io/v1/id/610c54deffce846a83e70625', 
      title: "Named Glosses" 

    },
    {
      name: 'Add Manifest Expression (not working)',
      dataUrl: 'https://store.rerum.io/v1/id/610c54deffce846a83e70625', 
      title: "Named Glosses" 
    },
    {
      name: 'Register a Canonical Text (not working)',
      dataUrl: 'https://store.rerum.io/v1/id/610c54deffce846a83e70625', 
      title: "Named Glosses" 
    }
  ];

  const OtherActions = [
    'Placeholder 1',
    'Placeholder 2',
    'Placeholder 3',
    'Placeholder 4',
  ];

  const updateData = (tool) => {
    setPageData({
      dataUrl: tool.dataUrl,
      title: tool.title
    });
  }

  return (
    <Layout>
      <div className="flex flex-row">
        <div className="w-1/5 whitespace-nowrap overflow-hidden">
          <div className="pb-4">
            <p className="text-2xl pb-2">
              Gallery of Glosses
            </p>
            <div className="flex flex-col gap-2">
                {OtherActions.map((OtherActions, index) => (
                    <p className="text-blue-500 cursor-pointer" key={index}>{OtherActions}</p>
                ))}
            </div>
          </div>
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
          <div>
            <TextList dataUrl={pageData.dataUrl} title={pageData.title}/>
          </div>
        </div>
      </div>
      
    </Layout>
  );
};

export default Texts;
