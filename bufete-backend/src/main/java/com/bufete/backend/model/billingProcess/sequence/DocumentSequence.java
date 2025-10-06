package com.bufete.backend.model.billingProcess.sequence;

import com.bufete.backend.model.shared.ReceiptSettleEnumType;

import javax.persistence.*;

@Entity
@Table(name = "document_sequence")
public class DocumentSequence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "document_type", length = 20)
    @Enumerated(EnumType.STRING)
    private DocumentType documentType;

    public DocumentSequence(DocumentType documentType) {
        this.documentType = documentType;
    }

    public DocumentSequence() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DocumentType getDocumentType() {
        return documentType;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }
}
