'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { formatDistanceToNow, format } from 'date-fns';
import {
  Search,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle,
  Archive,
  MoreVertical,
  Eye,
  Trash2,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

type ContactStatus = 'new' | 'read' | 'responded' | 'archived';

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ContactStatus | 'all'>('all');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const [deleteContactId, setDeleteContactId] = useState<Id<'contacts'> | null>(null);

  const contacts = useQuery(api.contacts.list, {});
  const updateStatus = useMutation(api.contacts.updateStatus);
  const addNote = useMutation(api.contacts.addNote);
  const deleteContact = useMutation(api.contacts.remove);

  const filteredContacts = contacts?.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: Id<'contacts'>, status: ContactStatus) => {
    try {
      await updateStatus({ id, status });
      toast.success(`Status updated to ${status}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedContact) return;
    try {
      await addNote({ id: selectedContact._id, notes });
      toast.success('Notes saved');
      setSelectedContact({ ...selectedContact, notes });
    } catch (error) {
      toast.error('Failed to save notes');
    }
  };

  const handleDelete = async () => {
    if (!deleteContactId) return;
    try {
      await deleteContact({ id: deleteContactId });
      toast.success('Contact deleted');
      setDeleteContactId(null);
      if (selectedContact?._id === deleteContactId) {
        setSelectedContact(null);
      }
    } catch (error) {
      toast.error('Failed to delete contact');
    }
  };

  const openContact = (contact: any) => {
    setSelectedContact(contact);
    setNotes(contact.notes || '');
    if (contact.status === 'new') {
      handleStatusChange(contact._id, 'read');
    }
  };

  const statusColors = {
    new: 'bg-blue-100 text-blue-700 border-blue-200',
    read: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    responded: 'bg-green-100 text-green-700 border-green-200',
    archived: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  const statusIcons = {
    new: MessageSquare,
    read: Eye,
    responded: CheckCircle,
    archived: Archive,
  };

  if (!contacts) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const newCount = contacts.filter((c) => c.status === 'new').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Contact Submissions
            {newCount > 0 && (
              <Badge className="ml-3 bg-blue-600">{newCount} new</Badge>
            )}
          </h1>
          <p className="text-gray-600">View and respond to contact inquiries</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as ContactStatus | 'all')}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="responded">Responded</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Contacts List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact List */}
        <div className="lg:col-span-1 space-y-3">
          {filteredContacts?.length === 0 ? (
            <Card className="border-2 border-dashed border-gray-200">
              <CardContent className="py-12 text-center">
                <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : 'No contact submissions yet'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="space-y-3 pr-4">
                {filteredContacts?.map((contact) => {
                  const StatusIcon = statusIcons[contact.status];
                  return (
                    <Card
                      key={contact._id}
                      className={`cursor-pointer border-2 transition-colors ${
                        selectedContact?._id === contact._id
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-100 hover:border-gray-200'
                      } ${contact.status === 'new' ? 'border-l-4 border-l-blue-500' : ''}`}
                      onClick={() => openContact(contact)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900 truncate">
                                {contact.name}
                              </h4>
                              <Badge className={`text-xs ${statusColors[contact.status]}`}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {contact.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{contact.email}</p>
                            <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                              {contact.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDistanceToNow(contact.createdAt, { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Contact Detail */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <Card className="border-2 border-gray-100">
              <CardHeader className="border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedContact.name}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      Submitted {format(selectedContact.createdAt, 'PPpp')}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(selectedContact._id, 'responded')}
                      >
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Mark as Responded
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(selectedContact._id, 'archived')}
                      >
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setDeleteContactId(selectedContact._id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="text-sm font-medium text-green-600 hover:underline"
                      >
                        {selectedContact.email}
                      </a>
                    </div>
                  </div>
                  {selectedContact.phone && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <a
                          href={`tel:${selectedContact.phone}`}
                          className="text-sm font-medium text-green-600 hover:underline"
                        >
                          {selectedContact.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Message */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Message</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Internal Notes</h4>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about this contact..."
                    rows={4}
                  />
                  <Button
                    onClick={handleSaveNotes}
                    className="mt-3 bg-green-600 hover:bg-green-700"
                  >
                    Save Notes
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t">
                  <a href={`mailto:${selectedContact.email}`}>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Send className="h-4 w-4 mr-2" />
                      Reply via Email
                    </Button>
                  </a>
                  {selectedContact.phone && (
                    <a href={`tel:${selectedContact.phone}`}>
                      <Button variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2 border-dashed border-gray-200 h-full">
              <CardContent className="flex items-center justify-center h-full py-12">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a contact
                  </h3>
                  <p className="text-gray-500">
                    Click on a contact to view details
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteContactId} onOpenChange={() => setDeleteContactId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this contact? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
