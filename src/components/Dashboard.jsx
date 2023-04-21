import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  // CalendarIcon,
  // ChartPieIcon,
  // DocumentDuplicateIcon,
  // FolderIcon,
  // HomeIcon,
  // UsersIcon,
  XMarkIcon,
  PencilIcon
} from '@heroicons/react/24/outline'
import DeleteModal from './Delete'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import RichText from './TextEditor/RichText.tsx';


const navigation = [
  { name: 'Document', href: '#', icon: PencilIcon, current: true },
  // { name: 'Brainstorm', href: '#', icon: PencilIcon, current: false },
//   { name: 'Projects', href: '#', icon: FolderIcon, current: false },
//   { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
//   { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
//   { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]
const teams = [
  { id: 1, name: 'Upgrade', href: '#', initial: 'U', current: false },
  { id: 2, name: 'Discord', href: '#', initial: 'D', current: false },
  { id: 3, name: 'Resources', href: '#', initial: 'R', current: false },
  { id: 4, name: 'Log out', href: '#', initial: 'L', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [menuOptions, setMenuOptions] = useState('Document');
  const [documents, setDocuments] = useState([]);
//   const [brainstorm, setBrainstorm] = useState([]);
  const [searchDocument, setSearchDocument] = useState('')
  const [edit, setEdit] = useState(false);
  const [changeDocument, setChangeDocument] = useState('');
  const [deleteState, setDeleteState] = useState(false);

  useEffect(() => {
    console.log(documents)
  }, [documents])

  useEffect(()=> {
    const ww = document.getElementById('main')
    if(menuOptions == 'Document') {
      ww.classList.remove('bg-gray-200')
      ww.classList.add('bg-white')
    }
    else {
      ww.classList.remove('bg-white')
      ww.classList.add('bg-gray-200')
    }
  }, [menuOptions])

  const SubmitDocumentHandler = () => {
    setDocuments(documents.concat({id: Math.random()*1000, value: searchDocument}));
  }

  const DeleteHandler = () => {
    setDocuments(documents.filter((doc) => doc.id != menuOptions))
  }

  const EditHandler = () => {
    setEdit(!edit);
    if(changeDocument!=='') {
      if(documents.find((doc)=> doc.id == menuOptions)!=undefined) {
        const dd1 = documents.filter((doc) => doc.id == menuOptions)
        const idx = documents.findIndex((doc) => doc.id == menuOptions)
        dd1[0].value = changeDocument;
        let doc = documents;
        doc[idx] = dd1[0]
      }
    }
  }

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center border-b">
                      {/* <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      /> */}
                      <p className='font-bold w-full text-[30px]'>Delilah</p>
                    </div>
                    <nav className="flex flex-1 flex-col justify-space-between">
                      <ul role="list" className="flex flex-1 flex-col h-full gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  onClick={() => {setMenuOptions(item.name)}}
                                  className={classNames(
                                    menuOptions === item.name
                                      ? 'bg-pinky text-black'
                                      : 'text-black hover:text-black hover:bg-pinky',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      menuOptions === item.name ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                      'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        {documents.length===0?<></>:
                              <li>
                                  <div className="text-xs font-semibold leading-6 text-gray-400">Your documents</div>
                                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                                  {documents.map((doc) => (
                                      <li key={doc.id}>
                                      <a
                                      //   href={doc.href}
                                          onClick={() => setMenuOptions(doc.id)}
                                          className={classNames(
                                          menuOptions === doc.id
                                              ? 'bg-pinky text-black'
                                              : 'text-black hover:text-black hover:bg-pinky',
                                          'group cursor-pointer flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                          )}
                                      >
                                          <span
                                          className={classNames(
                                              menuOptions === doc.id
                                              ? 'text-black'
                                              : 'text-black group-hover:text-black',
                                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[0.625rem] font-medium'
                                          )}
                                          >
                                          {/* {team.initial} */}
                                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                              </svg>
                                          </span>
                                          <div className='flex justify-between w-full'>
                                            {menuOptions === doc.id && edit===true?(
                                            <input 
                                            value={changeDocument} 
                                            placeholder='New document' onChange={(e)=> setChangeDocument(e.target.value)} />)
                                            :(<span className="truncate">{doc.value}</span>)}
                                            {menuOptions === doc.id?(<span className='g-4 flex'>
                                              <svg onClick={() => {setChangeDocument(doc.value); EditHandler();}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                              </svg>

                                              <svg onClick={() => {setDeleteState(true)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                              </svg>
                                            </span>):(<></>)}
                                          </div>
                                      </a>
                                      </li>
                                  ))}
                                  </ul>
                              </li>
                        }
                        </ul>
                        <ul role="list" className="-mx-2 space-y-1">
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400 border-t"></div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  onClick={() => {setMenuOptions(team.name)}}
                                  className={classNames(
                                    menuOptions === team.name
                                      ? 'bg-pinky text-black'
                                      : 'text-black hover:text-black hover:bg-pinky',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      menuOptions === team.name
                                        ? 'text-black'
                                        : 'text-black border-black group-hover:border-black group-hover:text-black',
                                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                    )}
                                  >
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center mb-3 border-b">
              {/* <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              /> */}
              <p className='font-bold w-full text-[30px]'>Delilah</p> 
            </div>
            <nav className="flex flex-1 flex-col justify-space-between">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          onClick={()=> {setMenuOptions(item.name)}}
                          href={item.href}
                          className={classNames(
                            menuOptions === item.name
                              ? 'bg-pinky text-black'
                              : 'text-black hover:text-black hover:bg-pinky',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              menuOptions === item.name ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                {documents.length===0?<></>:
                    <li>
                        <div className="text-xs font-semibold leading-6 text-gray-400">Your documents</div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {documents.map((doc) => (
                            <li key={doc.id}>
                            <a
                            //   href={doc.href}
                                onClick={() => setMenuOptions(doc.id)}
                                className={classNames(
                                menuOptions === doc.id
                                    ? 'bg-pinky text-black'
                                    : 'text-black hover:text-black hover:bg-pinky',
                                'group cursor-pointer flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                            >
                                <span
                                className={classNames(
                                    menuOptions === doc.id
                                    ? 'text-black'
                                    : 'text-black group-hover:text-black',
                                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[0.625rem] font-medium'
                                )}
                                >
                                {/* {team.initial} */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                </span>
                                <div className='flex justify-between w-full'>
                                  {menuOptions === doc.id && edit===true?(
                                  <input 
                                  value={changeDocument} 
                                  placeholder='New document' onChange={(e)=> setChangeDocument(e.target.value)} />)
                                  :(<span className="truncate">{doc.value}</span>)}
                                  {menuOptions === doc.id?(<span className='g-4 flex'>
                                    <svg onClick={() => {setChangeDocument(doc.value); EditHandler();}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>

                                    <svg onClick={() => setDeleteState(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                  </span>):(<></>)}
                                </div>
                            </a>
                            </li>
                        ))}
                        </ul>
                    </li>
                }
                </ul>
                <ul role="list" className="-mx-2 space-y-1">
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400 border-t"></div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          onClick={() => setMenuOptions(team.name)}
                          className={classNames(
                            menuOptions === team.name
                              ? 'bg-pinky text-black'
                              : 'text-black hover:text-black hover:bg-pinky',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <span
                            className={classNames(
                              menuOptions === team.name
                                ? 'text-black border-indigo-600'
                                : 'text-black border-black group-hover:border-black group-hover:text-black',
                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                            )}
                          >
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Tom Cook</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-2xl font-bold leading-6 text-gray-900">Delilah</div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </a>
        </div>

        <main id="main" className="py-10 min-[0px]:h-[90vh] lg:h-[100vh] lg:pl-72 h-full flex bg-gray-200 justify-center">
            { menuOptions === 'Document'?
            (<div className="px-4 sm:px-6 lg:px-8 h-full min-[0px]:py-36 sm:p-48 align-center">
            <div className='min-[0px]:w-full md:w-[35rem]'>
                <div className='font-bold mb-5 text-center w-full'>Hey HARDIK, what are you writing about today?</div>
                <div className='flex shadow-xl w-full'>
                    <input value={searchDocument} onChange={(e) => setSearchDocument(e.target.value)} className='w-full border p-2 h-10 rounded-l-lg' placeholder='A short description of your essay' />
                    <button onClick={SubmitDocumentHandler} className='p-2 hover:bg-gray-200 hover:text-gray-900 bg-pinky text-gray-100 rounded-r-lg'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </button>
                </div>
                <div className='p-4 mt-5'>
                    <div className='font-bold text-gray-400 pb-2 border-b'>Not sure? Here's some suggestions.</div>
                    <div className='min-[0px]:text-sm sm:text-md md:text-xl cursor-pointer p-2 border-b hover:italic' onClick={() => setSearchDocument('The significance of the Magna Carta in legal history')}>The significance of the Magna Carta in legal history</div>
                    <div className='min-[0px]:text-sm sm:text-md  md:text-xl cursor-pointer p-2 border-b hover:italic' onClick={() => setSearchDocument('The philosophy of religion: the existence of God')}>The philosophy of religion: the existence of God</div>
                    <div className='min-[0px]:text-sm sm:text-md md:text-xl cursor-pointer p-2 hover:italic' onClick={() => setSearchDocument("The history of women's suffrage")}>The history of women's suffrage</div>
                </div>
            </div></div>):(<>
                {<div className='min-[0px]:block min-[0px]:space-y-10 lg:flex lg:space-x-10'> 
                  <div className='align-center'>
                    <RichText />
                  </div>
                  <div className='min-[0px]:hidden min-[400px]:block align-center pl-10 space-y-10'>
                    <div className='bg-white rounded w-[20rem]'>
                      <div className='font-semibold border-b p-2'>Commands</div>
                      <div className='cursor-pointer p-2 rounded hover:bg-pinky'>Generate Content</div>
                      <div className='cursor-pointer p-2 rounded hover:bg-pinky'>Transform Text</div>
                      <div className='cursor-pointer p-2 rounded hover:bg-pinky'>Show don't tell</div>
                      <div className='cursor-pointer p-2 rounded hover:bg-pinky'>Write a sentence</div>
                      <div className='cursor-pointer p-2 rounded hover:bg-pinky'>Write a paragraph</div>
                    </div>  
                    <div className='bg-white rounded w-[20rem]'>
                      <div className='font-semibold border-b p-2'>Commands</div>
                      <div className='cursor-pointer p-2 rounded hover:bg-pinky'>Generate Content</div>
                      <div className='cursor-pointer p-2 rounded hover:bg-pinky'>Transform Text</div>
                      <div className='cursor-pointer p-2 rounded hover:bg-pinky'>Show don't tell</div>
                      <div className='cursor-pointer p-2 rounded hover:bg-pinky'>Write a sentence</div>
                      <div className='cursor-pointer p-2 rounded hover:bg-pinky'>Write a paragraph</div>
                    </div> 
                  </div>        
                </div>}
            </>)
            }
        </main>
      </div>





      <Transition.Root show={deleteState} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setDeleteState}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setDeleteState(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Delete document
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete the document? All of your data will be permanently removed
                          from our servers forever. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => {setDeleteState(false); DeleteHandler(); }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setDeleteState(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
