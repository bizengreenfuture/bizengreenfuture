'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { formatDistanceToNow } from 'date-fns';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  MoreVertical,
  Users,
  Building2,
  Mail,
  Phone,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
type LeadInterest = 'supertech' | 'fertilizers' | 'feed' | 'general';

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: LeadInterest;
  source: string;
  notes: string;
}

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [interestFilter, setInterestFilter] = useState<LeadInterest | 'all'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<any>(null);
  const [deleteLeadId, setDeleteLeadId] = useState<Id<'leads'> | null>(null);

  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: 'general',
    source: '',
    notes: '',
  });

  const leads = useQuery(api.leads.list, {});
  const createLead = useMutation(api.leads.create);
  const updateLead = useMutation(api.leads.update);
  const updateStatus = useMutation(api.leads.updateStatus);
  const deleteLead = useMutation(api.leads.remove);

  const filteredLeads = leads?.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesInterest = interestFilter === 'all' || lead.interest === interestFilter;
    return matchesSearch && matchesStatus && matchesInterest;
  });

  const openForm = (lead?: any) => {
    if (lead) {
      setEditingLead(lead);
      setFormData({
        name: lead.name,
        email: lead.email,
        phone: lead.phone || '',
        company: lead.company || '',
        interest: lead.interest,
        source: lead.source || '',
        notes: lead.notes || '',
      });
    } else {
      setEditingLead(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        interest: 'general',
        source: '',
        notes: '',
      });
    }
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingLead) {
        await updateLead({
          id: editingLead._id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          company: formData.company || undefined,
          interest: formData.interest,
          source: formData.source || undefined,
          notes: formData.notes || undefined,
        });
        toast.success('Lead updated successfully');
      } else {
        await createLead({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          company: formData.company || undefined,
          interest: formData.interest,
          source: formData.source || undefined,
          notes: formData.notes || undefined,
        });
        toast.success('Lead created successfully');
      }
      setIsFormOpen(false);
    } catch (error) {
      toast.error('Failed to save lead');
    }
  };

  const handleStatusChange = async (id: Id<'leads'>, status: LeadStatus) => {
    try {
      await updateStatus({ id, status });
      toast.success(`Status updated to ${status}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!deleteLeadId) return;
    try {
      await deleteLead({ id: deleteLeadId });
      toast.success('Lead deleted');
      setDeleteLeadId(null);
    } catch (error) {
      toast.error('Failed to delete lead');
    }
  };

  const statusColors = {
    new: 'bg-blue-100 text-blue-700 border-blue-200',
    contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    qualified: 'bg-purple-100 text-purple-700 border-purple-200',
    converted: 'bg-green-100 text-green-700 border-green-200',
    lost: 'bg-red-100 text-red-700 border-red-200',
  };

  const interestColors = {
    supertech: 'bg-blue-50 text-blue-700',
    fertilizers: 'bg-green-50 text-green-700',
    feed: 'bg-orange-50 text-orange-700',
    general: 'bg-gray-50 text-gray-700',
  };

  if (!leads) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const newCount = leads.filter((l) => l.status === 'new').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Leads
            {newCount > 0 && (
              <Badge className="ml-3 bg-blue-600">{newCount} new</Badge>
            )}
          </h1>
          <p className="text-gray-600">Track and manage potential customers</p>
        </div>
        <Button onClick={() => openForm()} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Lead
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as LeadStatus | 'all')}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={interestFilter}
          onValueChange={(value) => setInterestFilter(value as LeadInterest | 'all')}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Interest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Interests</SelectItem>
            <SelectItem value="supertech">Supertech</SelectItem>
            <SelectItem value="fertilizers">Fertilizers</SelectItem>
            <SelectItem value="feed">Animal Feed</SelectItem>
            <SelectItem value="general">General</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Leads List */}
      {filteredLeads?.length === 0 ? (
        <Card className="border-2 border-dashed border-gray-200">
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== 'all' || interestFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Get started by adding your first lead'}
            </p>
            <Button onClick={() => openForm()} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredLeads?.map((lead) => (
            <Card
              key={lead._id}
              className="border-2 border-gray-100 hover:border-green-200 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{lead.name}</h4>
                      <Badge className={statusColors[lead.status]}>{lead.status}</Badge>
                      <Badge variant="secondary" className={interestColors[lead.interest]}>
                        {lead.interest}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {lead.email}
                      </span>
                      {lead.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {lead.phone}
                        </span>
                      )}
                      {lead.company && (
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {lead.company}
                        </span>
                      )}
                    </div>
                    {lead.notes && (
                      <p className="text-sm text-gray-500 mt-2 line-clamp-1">{lead.notes}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      Added {formatDistanceToNow(lead.createdAt, { addSuffix: true })}
                      {lead.source && ` • Source: ${lead.source}`}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openForm(lead)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(lead._id, 'contacted')}
                      >
                        Mark as Contacted
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(lead._id, 'qualified')}
                      >
                        Mark as Qualified
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(lead._id, 'converted')}
                        className="text-green-600"
                      >
                        Mark as Converted
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(lead._id, 'lost')}
                        className="text-red-600"
                      >
                        Mark as Lost
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setDeleteLeadId(lead._id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Lead Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingLead ? 'Edit Lead' : 'Add New Lead'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="interest">Interest *</Label>
                <Select
                  value={formData.interest}
                  onValueChange={(value) =>
                    setFormData({ ...formData, interest: value as LeadInterest })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supertech">Supertech</SelectItem>
                    <SelectItem value="fertilizers">Fertilizers</SelectItem>
                    <SelectItem value="feed">Animal Feed</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Input
                  id="source"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  placeholder="e.g., Website, Referral"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingLead ? 'Update Lead' : 'Add Lead'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteLeadId} onOpenChange={() => setDeleteLeadId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lead</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this lead? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
