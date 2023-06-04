import Layout from '../components/layout';
import NamedGlosses from '../components/named-gloss';
import Link from 'next/link';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';

const Glosses = () => {
  const UserTools = [
    'Search Named Glosses',
    'Search Canonical Texts',
    'Add Manifest Expression',
    'Register a Canonical Text',
  ];

  const OtherActions = [
    'Placeholder 1',
    'Placeholder 2',
    'Placeholder 3',
    'Placeholder 4',
  ];


  /*
    Search/Browse Named Glosses behaviors
    #16 opened on Aug 22, 2022 by cubap

    Search/Browse Canonical Texts behaviors
    #15 opened on Aug 22, 2022 by cubap

    Link Named Glosses to external texts or Entities behaviors
    #14 opened on Aug 22, 2022 by cubap

    Describe Manuscript Expressions behaviors
    #13 opened on Aug 22, 2022 by cubap

    Describe a single Gloss behaviors
    #12 opened on Aug 22, 2022 by cubap

    Named Gloss lemma visualization behaviors
    #11 opened on Aug 22, 2022 by cubap

    Encode Transcription of an instance of a Gloss behaviors
    #9 opened on Aug 22, 2022 by cubap

    Add Manifest Expression of Canonical Text behaviors
    #8 opened on Aug 22, 2022 by cubap

    Register a new "Canonical Text" behaviors
    #6 opened on Aug 22, 2022 by cubap
  */


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
                {UserTools.map((UserTools, index) => (
                    <p className="text-blue-500 cursor-pointer" key={index}>{UserTools}</p>
                ))}
            </div>
          </div>
        </div>
        <div className="w-4/5">
          <div className="flex flex-row">
            <p className="text-2xl">
              Named Glosses
            </p>
            <div className="ml-auto flex flex-row text-[18px]">
              <TbAdjustmentsHorizontal className="text-black translate-y-1"/>
              <p>[</p>
              <p className="cursor-pointer text-blue-500 mx-1">
                Filters
              </p>
              <p>]</p>
            </div>

          </div>
          <div className="border-[1.5px] border-black bg-grey/10">
            <p className="px-2">
              <Link className="text-blue-500 text-semibold" href="/"> Home </Link> &gt; Named Glosses 
            </p>
          </div>
          <div className="pt-2">
            <NamedGlosses />
          </div>
        </div>
      </div>
      
    </Layout>
  );
};

export default Glosses;
