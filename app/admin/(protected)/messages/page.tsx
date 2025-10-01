import { Metadata } from "next";
import AdminLayout from "@/components/admin/admin-layout";
import { prisma } from "@/lib/prisma";
import { Mail, Phone, Clock, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Xabarlar - EvolvoAI Admin",
  description: "Mijozlar xabarlari",
};

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  let contacts: any[] = [];
  
  try {
    contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">Xabarlar</h1>
          <p className="text-gray-400">Mijozlar murojaatlari va xabarlari</p>
        </div>

        {contacts.length === 0 ? (
          <div className="text-center py-20">
            <Mail className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Hozircha xabarlar yo'q</h3>
            <p className="text-gray-400">Mijozlardan xabarlar bu yerda ko'rinadi</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {contacts.map((contact) => (
              <div 
                key={contact.id}
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(26, 31, 58, 0.5)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{contact.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {contact.email}
                      </span>
                      {contact.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {contact.phone}
                        </span>
                      )}
                    </div>
                  </div>
                  <span 
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      contact.status === 'NEW' ? 'bg-green-500/20 text-green-400' :
                      contact.status === 'IN_PROGRESS' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {contact.status}
                  </span>
                </div>

                <div className="bg-white/5 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400 mb-2">Xizmat: {contact.serviceType}</p>
                  <p className="text-gray-200">{contact.message}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    {new Date(contact.createdAt).toLocaleString("uz-UZ")}
                  </span>
                  <button className="px-4 py-2 rounded-lg font-semibold text-white transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #FF0080, #7928CA)" }}>
                    <CheckCircle className="w-4 h-4 inline mr-2" />
                    Javob berish
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
