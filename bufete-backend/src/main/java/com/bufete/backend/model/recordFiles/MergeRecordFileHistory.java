package com.bufete.backend.model.recordFiles;

import com.bufete.backend.model.audit.UserDateAudit;

import javax.persistence.*;

@Entity
@Table(name = "record_file_merge_history")
public class MergeRecordFileHistory extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "original_record_id")
    private Long originalRecordId;

    @Column(name = "merge_record_id")
    private Long mergeRecordId;

    public MergeRecordFileHistory(Long originalRecordId, Long mergeRecordId) {
        this.originalRecordId = originalRecordId;
        this.mergeRecordId = mergeRecordId;
    }

    public MergeRecordFileHistory() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOriginalRecordId() {
        return originalRecordId;
    }

    public void setOriginalRecordId(Long originalRecordId) {
        this.originalRecordId = originalRecordId;
    }

    public Long getMergeRecordId() {
        return mergeRecordId;
    }

    public void setMergeRecordId(Long mergeRecordId) {
        this.mergeRecordId = mergeRecordId;
    }
}
