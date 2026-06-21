import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

export default function AdminPanel() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications' | 'enquiries'>('jobs');
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [newJob, setNewJob] = useState({ title: '', type: '', location: '', exp: '', desc: '', skills: '' });

  useEffect(() => {
    fetchJobs();
    fetchApplications();
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    const q = query(collection(db, 'enquiries'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    setEnquiries(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const fetchJobs = async () => {
    const querySnapshot = await getDocs(collection(db, 'jobs'));
    setJobs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const fetchApplications = async () => {
    // Assuming 'applications' collection
    const q = query(collection(db, 'applications'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    setApplications(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const addJob = async () => {
    if (!newJob.title) return;
    await addDoc(collection(db, 'jobs'), {
      ...newJob,
      skills: newJob.skills.split(',').map(s => s.trim())
    });
    fetchJobs();
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      
      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab('jobs')} className={`px-4 py-2 rounded ${activeTab === 'jobs' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>Manage Jobs</button>
        <button onClick={() => setActiveTab('applications')} className={`px-4 py-2 rounded ${activeTab === 'applications' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>Applications ({applications.length})</button>
        <button onClick={() => setActiveTab('enquiries')} className={`px-4 py-2 rounded ${activeTab === 'enquiries' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>Enquiries ({enquiries.length})</button>
      </div>

      {activeTab === 'jobs' && (
        <div className="space-y-4 mb-8 p-6 bg-slate-50 rounded-xl">
          <h2 className="text-xl font-semibold">Post New Job</h2>
          <input placeholder="Title" onChange={e => setNewJob({...newJob, title: e.target.value})} className="border p-2 w-full rounded" />
          <input placeholder="Type (e.g. Full-Time)" onChange={e => setNewJob({...newJob, type: e.target.value})} className="border p-2 w-full rounded" />
          <input placeholder="Location" onChange={e => setNewJob({...newJob, location: e.target.value})} className="border p-2 w-full rounded" />
          <input placeholder="Experience" onChange={e => setNewJob({...newJob, exp: e.target.value})} className="border p-2 w-full rounded" />
          <textarea placeholder="Description" onChange={e => setNewJob({...newJob, desc: e.target.value})} className="border p-2 w-full rounded" />
          <input placeholder="Skills (comma separated)" onChange={e => setNewJob({...newJob, skills: e.target.value})} className="border p-2 w-full rounded" />
          <button onClick={addJob} className="bg-blue-600 text-white px-6 py-2 rounded">Add Job</button>
        </div>
      )}

      {activeTab === 'jobs' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Current Jobs</h2>
          {jobs.map(job => (
            <div key={job.id} className="border p-4 mb-2 flex justify-between rounded-lg items-center">
              <div>
                <p className="font-semibold">{job.title}</p>
                <p className="text-sm text-slate-500">{job.location} • {job.type}</p>
              </div>
              <button onClick={async () => { await deleteDoc(doc(db, 'jobs', job.id)); fetchJobs(); }} className="text-red-500 hover:text-red-700">Delete</button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'applications' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Submitted Applications</h2>
          {applications.map(app => (
            <div key={app.id} className="border p-4 mb-2 rounded-lg bg-white shadow-sm">
              <p className="font-semibold">{app.applicantName}</p>
              <p className="text-sm">{app.applicantEmail}</p>
              <p className="text-xs text-slate-500">Job ID: {app.jobId} • {app.timestamp?.toDate().toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'enquiries' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Submitted Enquiries</h2>
          {enquiries.map(enq => (
            <div key={enq.id} className="border p-4 mb-2 rounded-lg bg-white shadow-sm">
              <p className="font-semibold">{enq.applicantName}</p>
              <p className="text-sm">{enq.applicantEmail}</p>
              <p className="text-sm italic">"{enq.message}"</p>
              <p className="text-xs text-slate-500">Timestamp: {enq.timestamp?.toDate().toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
