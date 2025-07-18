import { useLocation, useParams } from "react-router-dom";
import userLogo from "../../assets/user.svg";
import {
    faUser, faNoteSticky, faGear, faPlus, faTrash, faPen,
    faArrowDown, faArrowUp, faLink, faImage, faStickyNote, faEye
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Skeleton from '@mui/material/Skeleton';
import NewNodeModal from "../../modals/NewNodeModal";
import NewResourceModal from "../../modals/NewResourceModal";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ViewResourceModal from "../../modals/ViewResourceModal";

const colorMap: Record<string, string> = {
    yellow: "bg-yellow-200",
    green: "bg-green-200",
    pink: "bg-pink-200",
    purple: "bg-purple-200",
    blue: "bg-blue-200",
    gray: "bg-gray-200",
    dark: "bg-gray-600"
};

const ItemType = 'NODE';

interface DragItem {
    id: string;
    index: number;
    type: string;
}

interface DraggableNodeProps {
    node: any;
    index: number;
    moveNode: (dragIndex: number, hoverIndex: number) => void;
    expandedNodes: string[];
    resourceLoading: string[];
    nodeResources: Record<string, any[]>;
    handleExpandButton: (nodeId: string) => void;
    handleCollapseButton: (nodeId: string) => void;
    handleNewRecourse: (nodeId: string) => void;
    deleteNode: (nodeId: string) => void;
    deleteResource: (resourceId: string) => void;
    isLoading: boolean;
    userObject: any;
}



function Unit() {
    
    const location = useLocation();
    let navigate = useNavigate();
    const userObjectString = localStorage.getItem("userDetails");
    const userObject = userObjectString ? JSON.parse(userObjectString) : null;
    const { unitId } = useParams<string>();
    const [loadingSkeleton, setLoadingSkeleton] = useState(true);
    const [newNodeModal, setNewNodeModal] = useState(false);
    const [unit, setUnit] = useState<any>(null);
    const [nodes, setNodes] = useState<any>([]);
    const [nodeResources, setNodeResources] = useState<Record<string, any[]>>({});
    const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
    const [resourceLoading, setResourceLoading] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newResourceModal, setNewResourceModal] = useState(false);
    const [nodeId, setNodeId] = useState("");
    const [viewResource, setViewResource] = useState(false);
    const [resource, setResource] = useState({});
    function DraggableNode({
        node, index, moveNode, expandedNodes, resourceLoading, nodeResources,
        handleExpandButton, handleCollapseButton, handleNewRecourse, deleteNode,
        deleteResource, isLoading, userObject
    }: DraggableNodeProps) {
        const [{ isDragging }, drag] = useDrag({
            type: ItemType,
            item: { id: node._id, index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });

        const [, drop] = useDrop({
            accept: ItemType,
            hover: (draggedItem: DragItem) => {
                if (draggedItem.index !== index) {
                    moveNode(draggedItem.index, index);
                    draggedItem.index = index;
                }
            },
        });
        const setRef = useCallback((node: HTMLDivElement | null) => {
            if (node) drag(drop(node));
        }, [drag, drop]);
        return (
            <div
                ref={setRef}
                className={`mt-4 rounded-lg p-2 ${colorMap[node.color] || 'bg-gray-100'} ${isDragging ? 'opacity-50' : ''
                    } cursor-move transition-all duration-200 hover:shadow-lg`}
            >
                <div className="p-4 flex items-center justify-between border rounded-2xl border-gray-100">
                    <div className="flex items-center">
                        <span className="mr-2 text-gray-400">⋮⋮</span>
                        <p>{node.name}</p>
                    </div>
                    <ul className="flex items-center justify-between">
                        <li>
                            <button onClick={() => handleNewRecourse(node._id)}>
                                <FontAwesomeIcon icon={faPlus} className="cursor-pointer" />
                            </button>
                        </li>
                        <li>
                            <button disabled={isLoading} onClick={() => deleteNode(node._id)}>
                                <FontAwesomeIcon icon={faTrash} className={`ml-3 cursor-pointer ${isLoading ? "text-gray-400" : ""}`} />
                            </button>
                        </li>
                        <li><FontAwesomeIcon icon={faPen} className="ml-3 cursor-pointer" /></li>
                        {expandedNodes.includes(node._id) ? (
                            <li>
                                <button onClick={() => handleCollapseButton(node._id)}>
                                    <FontAwesomeIcon icon={faArrowUp} className="ml-3 cursor-pointer" />
                                </button>
                            </li>
                        ) : (
                            <li>
                                <button onClick={() => handleExpandButton(node._id)}>
                                    <FontAwesomeIcon icon={faArrowDown} className="ml-3 cursor-pointer" />
                                </button>
                            </li>
                        )}
                    </ul>
                </div>

                {expandedNodes.includes(node._id) && (resourceLoading.includes(node._id) ? false : (nodeResources[node._id]?.length === 0)) ? (
                    <div className="mx-10 my-2 text-center rounded-xl bg-white p-1 font-display">
                        Wow such empty, press + to add resources
                    </div>
                ) : (
                    expandedNodes.includes(node._id) && (
                        <div className={`mx-10 my-2 text-center rounded-xl bg-white p-2 font-display`}>
                            {resourceLoading.includes(node._id) ? (
                                <div className="text-gray-500 italic">Loading resources...</div>
                            ) : (
                                (nodeResources[node._id] || []).map((resource: any, i: number) => (
                                    <div key={i} className={`flex items-center justify-between p-3 border border-gray-200 ${colorMap[node.color] || 'bg-gray-100'} mb-1`}>
                                        <div className="flex items-center w-1/2">
                                            <FontAwesomeIcon icon={
                                                resource.type === 'link' ? faLink :
                                                    resource.type === 'image' ? faImage :
                                                        faStickyNote
                                            } className="text-sm mr-2" />
                                            <p className="text-sm font-display">{resource.name}</p>
                                        </div>
                                        <div className="flex items-center w-1/3">
                                            <img className="w-8 h-8 rounded-full mr-2" src={resource.createdBy.imgUrl || userLogo} />
                                            <p className="font-display text-sm">{resource.createdBy.name === userObject.user.name ? "Me" : resource.createdBy.name}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <ul className="flex items-center">
                                                <li><button className="cursor-pointer" onClick={() => { handleViewResource(resource) }}><FontAwesomeIcon icon={faEye} className="mr-4 text-sm" /></button></li>
                                                <li><button ><FontAwesomeIcon icon={faPen} className="mr-4 text-sm" /></button></li>
                                                <li><button className="cursor-pointer" onClick={() => { deleteResource(resource._id) }}><FontAwesomeIcon icon={faTrash} className="mr-4 text-sm" /></button></li>
                                            </ul>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )
                )}
            </div>
        );
    }
    const moveNode = (dragIndex: number, hoverIndex: number) => {
        setNodes((prevNodes: any[]) => {
            const newNodes = [...prevNodes];
            const draggedNode = newNodes[dragIndex];
            newNodes.splice(dragIndex, 1);
            newNodes.splice(hoverIndex, 0, draggedNode);
            return newNodes;
        });
    };



    async function handleExpandButton(nodeId: string) {
        let token = userObject?.token;

        if (!expandedNodes.includes(nodeId)) {
            setExpandedNodes(prev => [...prev, nodeId]);
            setResourceLoading(prev => [...prev, nodeId]);
        }

        try {
            let response = await axios.get(`http://147.93.127.229:3008/nodes/${nodeId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setNodeResources(prev => ({
                ...prev,
                [nodeId]: response.data.resources
            }));
        } catch (e) {
            console.log(e);
        } finally {
            setResourceLoading(prev => prev.filter(id => id !== nodeId));
        }
    }

    function handleCollapseButton(nodeId: string) {
        setExpandedNodes(prev => prev.filter(id => id !== nodeId));
    }

    async function getUnit() {
        let token = userObject?.token;
        try {
            let response = await axios.get(`http://147.93.127.229:3008/units/${unitId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUnit(response.data);
            setNodes(response.data.nodes);
            setLoadingSkeleton(false);
        } catch (e: any) {
            console.log(e);
        }
    }

    async function deleteNode(nodeId: string) {
        let token = userObject?.token;
        setIsLoading(true);
        try {
            await axios.delete(`http://147.93.127.229:3008/nodes/${nodeId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsLoading(false);
            navigate(0);
        } catch (e: any) {
            console.log(e);
            setIsLoading(false);
        }
    }

    function handleNewRecourse(nodeId: string) {
        setNewResourceModal(true);
        setNodeId(nodeId);
    }

    async function deleteResource(resourceId: string) {
        let token = userObject?.token;
        try {
            await axios.delete(`http://147.93.127.229:3008/resource/${resourceId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        catch (e: any) {
            console.log(e);
        }
        finally {
            navigate(0);
        }
    }


    function handleViewResource(resource: any) {
        setResource(resource);
        setViewResource(true);
    }

    useEffect(() => {
        getUnit();
    }, []);



    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex w-full">
                <div className="w-1/5">
                    <div className="min-h-161 shadow-2xl border-2 border-gray-300 p-5 bg-gray-200 ">
                        <div className="flex items-center border-2 rounded-xl px-2 shadow-xl bg-gradient-to-r from-[#a31be2] via-[#4204a0] to-[#29015f] cursor-pointer transition-all duration-300 transform hover:scale-105"
                            onClick={() => { navigate("/profile") }}>
                            <img src={userObject.user.imgUrl ? userObject.user.imgUrl : userLogo} alt="user" className="w-15 h-15 my-3 rounded-full object-cover" />
                            <div className="mx-2">
                                <p className=" text-white font-bold font-display">{userObject.user.name}</p>
                                <p className="text-sm text-gray-200 font-display">{userObject.user.email}</p>
                            </div>
                        </div>
                        <hr className="mt-10 text-gray-500" />
                        <div className="flex items-center mt-10 cursor-pointer bg-white w-1/2 text-center border-1 border-gray-400 rounded-2xl p-2 shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <button className="font-display text-lg font-bold cursor-pointer w-full mr-2"  >+ Invite</button>
                        </div>
                        <Link to="/files" className={`${!(location.pathname === `/files/${unitId}`) ? "flex items-center mt-5 ml-2 cursor-pointer" : "flex items-center mt-5  cursor-pointer border border-[#29015f] p-2 w-1/2 rounded-xl bg-[#29015f]"}`}>
                            <FontAwesomeIcon icon={faNoteSticky} className={`${!(location.pathname === `/files/${unitId}`) ? "text-[#29015f] text-xl" : "text-white text-xl"}`} />
                            <p className={`${!(location.pathname === `/files/${unitId}`) ? "ml-2 font-bold font-display text-[#29015f] hover:underline" : "ml-2 font-bold font-display text-white hover:underline"}`}>Nodes</p>
                        </Link>
                        <Link to="starred" className={`${!(location.pathname === 'starred') ? "flex items-center mt-5 ml-2 cursor-pointer" : "flex items-center mt-5  cursor-pointer border border-[#29015f] p-2 w-1/2 rounded-xl bg-[#29015f]"}`}>
                            <FontAwesomeIcon icon={faUser} className={`${!(location.pathname === 'starred') ? "text-[#29015f] text-xl" : "text-white text-xl"}`} />
                            <p className={`${!(location.pathname === '/starred') ? "ml-2 font-bold font-display text-[#29015f] hover:underline" : "ml-2 font-bold font-display text-white hover:underline"}`}>Members</p>
                        </Link>
                        <Link to="invitations" className={`${!(location.pathname === 'invitation') ? "flex items-center mt-5 ml-2 cursor-pointer" : "flex items-center mt-5  cursor-pointer border border-[#29015f] p-2 w-1/2 rounded-xl bg-[#29015f]"}`}>
                            <FontAwesomeIcon icon={faGear} className={`${!(location.pathname === 'invitations') ? "text-[#29015f] text-xl" : "text-white text-xl"}`} />
                            <p className={`${!(location.pathname === '/invitations') ? "ml-2 font-bold font-display text-[#29015f] hover:underline" : "ml-2 font-bold font-display text-white hover:underline"}`}>Invitations</p>
                        </Link>
                        <div className="mt-50 w-3/4 bg-red-500 mx-auto text-center p-1 rounded-sm text-white font-display cursor-pointer hover:bg-red-700" onClick={() => { navigate("/files") }}>
                            <p>Leave Unit</p>
                        </div>
                    </div>
                </div>
                <div className="w-4/5">
                    {loadingSkeleton ? (
                        <div className="mx-5 w-3/4 flex flex-wrap items-center justify-between">
                            {[...Array(1)].map((_, i) => (
                                <div key={i} className="flex flex-wrap mt-10 w-3/4">
                                    <Skeleton variant="rectangular" width="100%" height={118} />
                                    <Skeleton width="90%" />
                                    <Skeleton width="80%" />
                                    <Skeleton width="60%" />
                                </div>
                            ))}
                        </div>
                    ) : unit ? (
                        <div className="max-h-160 overflow-y-auto pr-1">
                            <div className="mx-5 w-90% flex flex-col mt-5 ">
                                <h2 className="text-xl font-display font-semibold">{unit.name}</h2>
                                <p className="text-lg font-display text-gray-500 italic">{unit.description}</p>
                                <p className="text-lg font-display text-gray-500 italic">
                                    Owner : <span className="text-blue-500">{unit.owner.name}</span>
                                </p>

                                <div className="flex items-center justify-between">
                                    <form className="w-1/2 mt-2">
                                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                </svg>
                                            </div>
                                            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  " placeholder="Search Nodes ..." required />
                                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-[#29015f] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 cursor-pointer">Search</button>
                                        </div>
                                    </form>
                                    <div className="flex items-center cursor-pointer bg-[#29015f] text-center rounded-sm pl-4 py-2 px-2 shadow-2xl transition-all duration-300 transform hover:scale-105"
                                        onClick={() => setNewNodeModal(true)}>
                                        <button className="font-display text-white text-lg font-bold cursor-pointer w-full mr-2">+</button>
                                    </div>
                                </div>

                                {nodes.map((node: any, index: number) => (
                                    <DraggableNode
                                        key={node._id}
                                        node={node}
                                        index={index}
                                        moveNode={moveNode}
                                        expandedNodes={expandedNodes}
                                        resourceLoading={resourceLoading}
                                        nodeResources={nodeResources}
                                        handleExpandButton={handleExpandButton}
                                        handleCollapseButton={handleCollapseButton}
                                        handleNewRecourse={handleNewRecourse}
                                        deleteNode={deleteNode}
                                        deleteResource={deleteResource}
                                        isLoading={isLoading}
                                        userObject={userObject}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

            {newNodeModal && <NewNodeModal onClose={() => setNewNodeModal(false)} unitId={unitId} />}
            {newResourceModal && <NewResourceModal onClose={() => setNewResourceModal(false)} nodeId={nodeId} />}
            {viewResource && <ViewResourceModal onClose={()=>{setViewResource(false)}} resource={resource} />}
        </DndProvider>
    );
}

export default Unit;